export default function useCardFormatter(data,params = {}) {
    const config = {
        numberKey : 'number',
        expiryKey : 'expiry',
        ...params
    };
    
    const formatCard = (val)=> {
            val = val.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1-').trim('-').slice(0, 19);
            return val;
    };
        
    const formatExpiry = function(val, oldVal) {
        val =
            val.replace(
                /[^0-9]/g, '' // To allow only numbers
            ).replace(
                /^([2-9])$/g, '0$1' // To handle 3 > 03
            ).replace(
                /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
            ).replace(
                /^0{1,}/g, '0' // To handle 00 > 0
            ).replace(
                /^([0-1]{1}[0-9]{1})([0-9]{1,4}).*/g, '$1/$2' // To handle 113 > 11/3
            );
        return val;
    };

    return {
        formatCard,
        formatExpiry,
    }
    
}
