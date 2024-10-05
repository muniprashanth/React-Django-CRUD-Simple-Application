const CustomSort=(data,key,direction) => {
    return [...data].sort((a,b)=>{
        if(a[key]<b[key])
        {
            return direction === 'ascending' ? -1:1;
        }
        if (a[key]>b[key]) 
        {
            return direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
};
export default CustomSort;