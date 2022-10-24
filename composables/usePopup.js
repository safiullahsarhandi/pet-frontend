import event from "~~/utils/event";

const popupsDefaultValue = {
    confirm: {
        title: null,
        message: null,
        visibility : true,
        onConfirm : ()=> {},
        onCancel : ()=> {},
        confirmBtnText : 'Yes', 
        cancelBtnText : 'No', 
    },
    success: {
        title: null,
        message: null,
        visibility : true,
        isError : false,
    },
    error: {
        title: null,
        message: null,
        visibility : true,
        isError : false,
    },
};
export default function usePopup() {
        
    const successPopup = (params) => {
        let data = {...popupsDefaultValue.success};
        Object.assign(data,params);
        event.publish('showSuccessPopup',data);
    };
    const errorPopup = (params)=> {
        params.isError = true;
    };
    const confirmPopup = (params = {})=> {
        let data = {...popupsDefaultValue.confirm};
        Object.assign(data,params);
        event.publish('showConfirmPopup',data);
    };

    return {
        successPopup,
        errorPopup,
        confirmPopup,
    };
}

