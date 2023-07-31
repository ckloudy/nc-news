export default function formatDate(date) {
    const dateOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    const displayDate = new Date(date);
    const dateString = displayDate.toLocaleDateString("en-GB", dateOptions);
    const hours = displayDate.getHours();
    const mins = displayDate.getMinutes();

    const ampm = hours < 12 ? "am" : "pm";
    const lessThanTenInHours = hours < 10 ? 0 : "";
    const lessThanTenInMinutes = mins < 10 ? 0 : "";

    const postedOn = `Posted on ${dateString} @ ${lessThanTenInHours}${hours}:${lessThanTenInMinutes}${mins}${ampm}`;

    return postedOn;
}
