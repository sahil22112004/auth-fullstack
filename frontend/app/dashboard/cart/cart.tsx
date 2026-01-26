"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { incrementQuantity, decrementQuantity, clearCart } from "../../redux/slices/authSlice";
import { fetchUserAddresses, createAddress, createOrder } from "../../service/checkOutApi";
import { useRouter } from "next/navigation";
import "./cart.css";

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 digits"),
});

type AddressFormType = z.infer<typeof AddressSchema>;

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const cart = useSelector((state: RootState) => state.auth.cart) || [];

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressFormType>({
    resolver: zodResolver(AddressSchema)
  });

  useEffect(() => {
    if (user?.id) loadAddresses();
  }, [user]);

  async function loadAddresses() {
    const result = await fetchUserAddresses(String(user?.id));
    setAddresses(result);
  }

  const onSubmitAddress = async (data: AddressFormType) => {
    const payload = { userId: String(user?.id), ...data };
    await createAddress(payload);
    await loadAddresses();
    setShowModal(false);
    reset();
    enqueueSnackbar("Address added successfully!", { variant: "success" });
  };

  async function handleCheckout() {
    if (!selectedAddress) {
      enqueueSnackbar("Please choose an address.", { variant: "error" });
      return;
    }

    const orderList = cart.map((item: any) => ({
      userId: String(user?.id),
      sellerId: String(item.userId),
      addressId: selectedAddress,
      productId: String(item.id),
      productName: item.productName,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    console.log("SENDING ORDER LIST:", orderList);

    await createOrder(orderList);

    enqueueSnackbar("Order placed successfully!", { variant: "success" });
    dispatch(clearCart());
    router.push("/dashboard/trackorder");
  }

  const totalAmount = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <button onClick={() => router.push("/dashboard")}>Home</button>
        <h2>Shopping Cart</h2>
        <button onClick={() => router.push("/dashboard/trackorder")}>Track Orders</button>
      </div>

      {cart.length !== 0 ? (
        <div>
          <div className="address-section">
            <div className="address-header">
              <h3>Select Delivery Address</h3>
              <button onClick={() => setShowModal(true)}>+ Add Address</button>
            </div>

            <div className="address-list">
              {addresses.map((addr) => (
                <label key={addr.id} className="address-item">
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id.toString()}
                    onChange={() => setSelectedAddress(addr.id.toString())}
                  />
                  <span>
                    <b>{addr.fullName}</b>, {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                    <br />
                    {addr.country} | Phone: {addr.phoneNumber}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item: any) => {
                const img = Array.isArray(item.photoUrl) ? item.photoUrl[0] : item.photoUrl;

                return (
                  <div className="cart-item" key={item.id}>
                    <img src={img} alt={item.productName} className="cart-img" />

                    <div className="cart-info">
                      <h3>{item.productName}</h3>
                      <p>{item.description}</p>
                      <p className="cart-price">₹{item.price}</p>

                      <div className="qty-controls">
                        <button onClick={() => dispatch(decrementQuantity(item.id))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Place Order
              </button>
            </div>
          </div>

          {showModal && (
            <div className="modal-backdrop">
              <form className="modal-box" onSubmit={handleSubmit(onSubmitAddress)}>
                <h3>Add Address</h3>

                <input {...register("fullName")} placeholder="Full Name" />
                {errors.fullName && <p className="error">{errors.fullName.message}</p>}

                <input {...register("street")} placeholder="Street" />
                {errors.street && <p className="error">{errors.street.message}</p>}

                <input {...register("city")} placeholder="City" />
                {errors.city && <p className="error">{errors.city.message}</p>}

                <input {...register("state")} placeholder="State" />
                {errors.state && <p className="error">{errors.state.message}</p>}

                <input {...register("zipCode")} placeholder="ZIP Code" />
                {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}

                <input {...register("country")} placeholder="Country" />
                {errors.country && <p className="error">{errors.country.message}</p>}

                <input {...register("phoneNumber")} placeholder="Phone Number" />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}

                <button type="submit">Save Address</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
        </div>
      )}
    </div>
  );
}
