import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "../api/axios";
import { useAuth } from "./AuthContext";

/**
 * BookingContext
 * Shared real-time booking store connected to the enterprise backend.
 */
const BookingContext = createContext(null);

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Fetch bookings when user changes
    const fetchBookings = useCallback(async () => {
        if (!currentUser) {
            setBookings([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const endpoint = currentUser.role === "admin" ? "/bookings" : "/bookings/me";
            const res = await apiClient.get(endpoint);
            if (res.success) {
                // Map the DB schema to the frontend format temporarily if needed, 
                // or just use the DB format directly. Let's adapt it cleanly.
                const mappedBookings = res.data.map(b => ({
                    ...b,
                    id: `BK-${String(b.id).padStart(4, "0")}`,
                    user: b.user_name || currentUser.name,
                    email: b.email || currentUser.email,
                    car: b.car_name,
                    amount: `$${b.total_price}`,
                    total: parseFloat(b.total_price),
                    createdAt: b.created_at,
                    start: b.start_date.split("T")[0],
                    end: b.end_date.split("T")[0],
                }));
                setBookings(mappedBookings);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    /** Add a new booking */
    async function addBooking(bookingData) {
        try {
            // Calculate total price based on string "$XX/day" parsing or pass directly
            const total_price = bookingData.total; 
            
            const res = await apiClient.post("/bookings", {
                car_id: bookingData.carId,
                start_date: bookingData.start,
                end_date: bookingData.end,
                total_price: total_price
            });

            if (res.success) {
                await fetchBookings(); // Refresh the list
                return `BK-${String(res.bookingId).padStart(4, "0")}`;
            }
        } catch (error) {
            console.error("Failed to create booking:", error);
            throw error;
        }
    }

    /** Update booking status */
    async function updateBookingStatus(id, status) {
        try {
            // Extract numeric ID from "BK-0001"
            const numericId = parseInt(id.replace("BK-", ""), 10);
            const res = await apiClient.patch(`/bookings/${numericId}/status`, { status });
            
            if (res.success) {
                // Optimistic UI update
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    return (
        <BookingContext.Provider value={{ bookings, loading, addBooking, updateBookingStatus, refreshBookings: fetchBookings }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    return useContext(BookingContext);
}
