import { useToast } from "vue-toastification";
import moment from 'moment';
export const useHelper = () => {
  let toast = useToast();
      
  const buildFormData = (formData, data, parentKey) => {

    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      
      formData.append(parentKey, value);
    }
    
  }

  const setAccessToken = (token) => localStorage.setItem('u_token', token);
  const getAccessToken = () => localStorage.getItem('u_token')
  const removeAccessToken = () => localStorage.removeItem('u_token');
  const format_date = (date, format = "LL") => moment(date).format(format);
  const format_number = (x) => x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  const notification = (message, type = 'success') => {
    toast[type](message);
  };
  
  const switchType = (e, refKey) => {
    let field = document.querySelector(refKey);
    console.log(field);
    if (field.getAttribute('type') == 'password') {
      e.target.classList.replace('fa-eye-slash', 'fa-eye');
      field.setAttribute('type', 'text');
      return;
    }
    e.target.classList.replace('fa-eye', 'fa-eye-slash');
    field.setAttribute('type', 'password');
    return;

  }

  const serialNumber = (data, index = 0) => {
    let starting = data.per_page * (data.current_page - 1);
    index++;
    return starting + index;
  }

  const actor = () => {
    return window.Laravel.actor.replace('-api', '');
  };


  const getCommission = (item) => {
    return (item.total * (parseFloat(item.commission.rate) / 100)).toFixed(2);

  };

  const getRevenue = (item) => {
    let commission = parseFloat(getCommission(item));
    return item.total - commission;
  };

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      let context = this;
      let args = arguments;
        
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
    
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    
      if (callNow) func.apply(context, args);
    };
  };
  const parseData = (data,structure)=> {
          let splittedStructure = structure.split('.');
          
          splittedStructure.forEach(element => {
              if(/^[0-9]$/.test(element))
                element = parseInt(element);
                if(data){
                  data = data[element] || null;
                }
          });    
      return data;
  }; 
  const pluck = (params = {},requiredParams = [])=> {
    params = JSON.parse( JSON.stringify(params) );
    let filteredKeys = {};
    requiredParams.forEach((item)=> {
      if(item in params){
        filteredKeys[item] =  params[item];
      }
      let isDeep = item.includes('.');
      if(isDeep){
        let structure = item.split('.');
        let [firstKey] = structure;
        structure.splice(0,1)
        let lastKey = structure[structure.length - 1];
        structure = structure.join('.');
        filteredKeys[lastKey] =  parseData(params[firstKey],structure);
      }
    });
    return filteredKeys;
  };

  const getCardMasked = (number)=> {
    let starting = number.slice(0,4);
    let ending = number.split('').reverse().join('').slice(0,4);
    return `${starting}**********${ending}`
  };

  return {
    buildFormData,
    getRevenue,
    getCommission,
    serialNumber,
    actor,
    switchType,
    notification,
    format_date,
    format_number,
    removeAccessToken,
    getAccessToken,
    setAccessToken,    
    debounce,
    pluck,
    getCardMasked,
  }
}
