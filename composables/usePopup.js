import event from "~~/utils/event";

const popupsDefaultValue = {
    confirm: {
        title: null,
        message: null,
        visibility : true,
        onConfirm : ()=> {},
        onCancel : ()=> {},
    }    
};
export default function usePopup() {
    // const dispatch = useDispatch();
    
    const successPopup = (params) => {
        // dispatch(updateSuccessPopup(true,params));
    };
    const errorPopup = (params)=> {
        params.isError = true;
        // dispatch(updateSuccessPopup(true,params));
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
