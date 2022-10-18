const {format_date} = useHelper
export const purchaseOrders = [
    {
        label : 'Order ID',
        key : 'id',
        format : (value) => `#${value}`
    },
    {
        label : 'Order Placed On',
        key : 'created_at',
        format : format_date,
    },
    {
        label : 'Price',
        key : 'total',
        format : (value) => `$${value}`
    }
]; 

export const shopOrders = [
    {
        label : 'Order ID',
        key : 'id',
        format : (value) => `#${value}`
    },
    {
        label : 'Order Placed On',
        key : 'created_at',
        format : format_date,
    },
    {
        label : 'Total Amount',
        key : 'total',
        format : (value) => `$${value}`
    }
]; 


export const adoptionOrders = [
    {
        label : 'Order ID',
        key : 'id',
        format : (value) => `#${value}`
    },
    {
        label : 'Order Placed On',
        key : 'created_at',
        format : format_date,
    },
    {
        label : 'Status',
        key : 'status',
    },
]; 

export const ads = [
    {
        label : 'Ad',
        key : 'name',
    },
    {
        label : 'Pet Type',
        key : 'category',
        format : (value)=> value.name 
    },
    {
        label : 'Total Offers',
        key : 'offers_count',
    }
]; 

export const offers = [
    {
        label : 'User Name',
        key : 'user',
        format : (value)=> value.name 
    },
    {
        label : 'User Email Address',
        key : 'user',
        format : (value)=> value.email, 
    }
]; 