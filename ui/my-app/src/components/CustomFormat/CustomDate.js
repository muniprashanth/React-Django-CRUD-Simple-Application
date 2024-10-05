const CustomDate=({ dateString }) => {
    const date=new Date(dateString);
    if (!isNaN(dateString)) 
        return null;
    const day=date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffix=(day===1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    const formattedDate=`${day}${suffix} ${month} ${year}`;
    return formattedDate.replace('{day}', day + suffix);
}

export default CustomDate;