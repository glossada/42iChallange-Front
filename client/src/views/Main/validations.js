const containsNumber = /\d/;

const validationsPS = (data) => {
  const errors = {};

    if (isNaN(data.number)) {
    errors.number = 'Number must be a valid number';
  }

  if (!data.targetSum.trim()) {
    errors.targetSum = 'Target sum cant be empty';
  }

  if (isNaN(data.targetSum)) {
    errors.targetSum = 'Target sum must be a valid number';
  }

  return errors;
};

const validateAllPS =(parameter)=>{
  const errors={
    exist:false
  }

  if (parameter.targetSum.length===0) {
    errors.exist=true;
    errors.title='Missing target sum';
  }

   if (parameter.numbers.length===0) {
    errors.exist=true;
    errors.image='Missing numbers';
   }

    return errors;
}

const validationsNCC = (data) => {
  const errors = {};

    if (isNaN(data.coin)) {
    errors.coin = 'Coin must be a valid number';
  }

  return errors;
};

const validateAllNCC =(parameter)=>{
  const errors={
    exist:false
  }

   if (parameter.coins.length===0) {
    errors.exist=true;
    errors.image='Missing coins';
   }

    return errors;
}

export { validationsPS, validateAllPS, validationsNCC, validateAllNCC };