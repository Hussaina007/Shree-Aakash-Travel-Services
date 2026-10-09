import { createClient } from "@supabase/supabase-js";

const form = document.querySelector(".trip-enquiry-form");

if (form) {
  const status = form.querySelector("[data-enquiry-status]");
  const submitButton = form.querySelector('[type="submit"]');
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  const isConfigured = Boolean(supabaseUrl && supabasePublishableKey);
  const supabase = isConfigured ? createClient(supabaseUrl, supabasePublishableKey) : null;

  if (!isConfigured && status) {
    status.textContent = import.meta.env.DEV
      ? "Setup needed: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file, then restart the local server."
      : "Online enquiries are not configured yet. Please contact us using the details on this page.";
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!supabase) return;

    const values = new FormData(form);
    const travelersValue = values.get("travelers");
    const inquiry = {
      full_name: String(values.get("full_name")).trim(),
      phone: String(values.get("phone")).trim(),
      email: String(values.get("email") || "").trim() || null,
      destination: String(values.get("destination")).trim(),
      travel_date: values.get("travel_date") || null,
      travelers: travelersValue ? Number(travelersValue) : null,
      trip_type: values.get("trip_type") || null,
      message: String(values.get("message") || "").trim() || null
    };

    submitButton.disabled = true;
    form.setAttribute("aria-busy", "true");
    if (status) status.textContent = "Sending your enquiry…";

    try {
      const { error } = await supabase.from("trip_inquiries").insert(inquiry);
      if (error) throw error;
      form.reset();
      if (status) status.textContent = "Thank you. Your enquiry has been received, and our team will be in touch.";
    } catch (error) {
      if (status) {
        status.textContent = import.meta.env.DEV && error?.message
          ? `We couldn’t save your enquiry. Check your Supabase table and insert-only RLS policy. Details: ${error.message}`
          : "We couldn’t save your enquiry just now. Your details are still here; please try again or contact us directly.";
      }
    } finally {
      submitButton.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
}
