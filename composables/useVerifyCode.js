export const useVerifyCode = () => {
  const code = ref([
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
    {
      value: "",
    },
  ]);
  
  const focusNext = (e, next) => {
    let nextInput = document.querySelector(`#digit${next}`);
    if (
      (e.keyCode > 47 && e.keyCode < 58) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      e.target.value = e.key;
      code.value[next - 1].value = e.key;
      if (nextInput != undefined) {
        nextInput.focus();
      }
    } else {
      e.preventDefault();
    }
  };
  
  const focusBack = (e, back) => {
      let backInput = document.querySelector(`#digit${back}`);
      let currentInput = document.querySelector(`#digit${back + 1}`);
  
    if (backInput != undefined) {
      if (code.value[back + 1].value == "") {
        backInput.focus();
      } else {
        code.value[back + 1].value = "";
        currentInput.value = "";
        currentInput.focus();
      }
    }
  };
  
  const handlePaste = async (e) => {

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    let pastedCode = pastedData.split('', 4);

    const codesData = await pastedCode.map((value, index) => ({ value }));
    code.value = codesData;
    let inputs = document.querySelectorAll('input[name^="digit-"]');
    await inputs.forEach((elem, index) => {
      elem.value = pastedCode[index];
    });
    // Do whatever with pasteddata

  }
  
  return {
    handlePaste,
    focusNext,
    focusBack,
    code,
  }
}
