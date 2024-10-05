const CustomDateTime = ({ dateString }) => {
    const dateObj = new Date(dateString); // Convert timestamp to a Date object
    if (!isNaN(dateString)) 
        return null;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const suffix=(day===1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    const formattedTimestamp = `${day}${suffix} ${month} ${year} ${formattedHours}:${minutes}:${seconds} ${meridiem}`;
    return formattedTimestamp;
};

export default CustomDateTime;
