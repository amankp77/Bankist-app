'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2022-07-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Vaishnavi Gupta',
  movements: [5000, 3400,-1000,-1000,500],
  interestRate: 1.5,
  pin: 5555,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z'
  ],
  currency: 'INR',
  locale: 'hi-IN',
};

const account3 = {
  owner: 'Aman Pathak',
  movements: [500, 340, 150, -7090, 3210, 1000, 500, 3000],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'hi-IN',
};

const account4 = {
  owner: 'Pathe Aishwarya',
  movements: [5000, 4000, 150, 790, 210, -1000, -8500, 3000],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2,account3, account4 ,account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnDark = document.querySelector('.theme--dark');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const setLogOutTimer = function(){
      let time = 600
     
      tick();
      const timer = setInterval(tick
        , 1000,time)
      

        function tick(){
          let minute = Math.trunc(time/60);
          let seconds = time % 60;
          time--
          labelTimer.textContent = `${String(minute).padStart(2,0)}:${String(seconds).padStart(2,0)}`
   
          if(time==0) {
           clearInterval(timer)
           containerApp.style.opacity = 0;
           currentAccount = undefined;
           
           
         }
        
     }

     return timer
}


const normalizeRupee = function(acc, rupee){
  return new Intl.NumberFormat(acc.locale,{
    style: "currency",
    currency: acc.currency
    
  }).format(rupee)
}

const createDate = function(acc,dateStr){
  
  const diffDays = Math.floor((Date.now() - new Date(dateStr))/(24*60*60*1000));
  if(diffDays==1) return "Yesterday";
  if(diffDays==0) return "Today";
  if(diffDays<7) return `${diffDays} Day Ago`
  // console.log(diffDays)
  // return `${date}/${month}/${year}`;
  const optional = {
    month:"numeric",
    year:"numeric",
    day:"numeric"
  }
  // console.log(dateStr)
  return new Intl.DateTimeFormat(acc.locale,optional).format(new Date(dateStr));
}

const displayMovements = function(acc, sort = false){

    if(sort)
     acc.movements = acc.movements.slice(0).sort((a,b)=>a-b)

    containerMovements.innerHTML = ""
    acc.movements.forEach((movement,i )=> {
          if(movement>0){
                //  console.log(acc.movementsDates[i])
                containerMovements.insertAdjacentHTML('afterbegin',`<div class="movements__row">
                <div class="movements__type movements__type--deposit">${i+1} deposit</div>
                <div class="movements__date">${createDate(acc,acc.movementsDates[i])}</div>
                <div class="movements__value">${normalizeRupee(acc,+movement.toFixed(2))}</div>
              </div>`)
          }
          else{
            containerMovements.insertAdjacentHTML('afterbegin', `<div class="movements__row">
            <div class="movements__type movements__type--withdrawal">${i+1} Withdraw</div>
            <div class="movements__date">${createDate(acc,acc.movementsDates[i])}</div>
            <div class="movements__value">${normalizeRupee(acc,+movement.toFixed(2))}</div>
          </div>`)
          }
   });
}

const createUsernames = function(accounts){
  accounts.forEach(function(acc){
        acc.username =  acc.owner.trim().split(' ').map(el => el[0].toLowerCase()).join('')
  })
   
}

const showBalance = function(acc,arr){
 const balance = arr.reduce((acc,el) => {
    return acc + el;
  },0);
  labelBalance.textContent = normalizeRupee(acc,+balance.toFixed(2));
}


const allDepositSum = function(acc,arr){
  const sum = arr.filter((el)=>el>0).reduce((acc,el)=>acc+el,0)
  return normalizeRupee(acc,+sum.toFixed(2));
}


const allWithdrawSum = function(acc,arr){
  const sum = arr.filter((el)=>el<0).reduce((acc,el)=>acc+el,0)
  // console.log(sum)
  return normalizeRupee(acc,+sum.toFixed(2));
}

const interestSum = function(acc){
  const arr = acc.movements
  const sum = arr.filter(el=>el>0).map(el=> el*(acc.interestRate/100)).reduce((acc,el)=>acc+el,0)
  // console.log(sum)
  return normalizeRupee(acc,+sum.toFixed(2));
}


const updateUI = function(currentAccount){
  displayMovements(currentAccount)
  showBalance(currentAccount,currentAccount.movements)
  labelSumIn.textContent = allDepositSum(currentAccount ,currentAccount.movements)
  labelSumOut.textContent = allWithdrawSum(currentAccount,currentAccount.movements)
  labelSumInterest.textContent = interestSum(currentAccount) 
}



let currentAccount, timer;



btnDark.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  btnClose.textContent = btnClose.textContent == "DARK"? "LIGHT" : "DARK"
})

btnLogin.addEventListener('click',(e)=>{
  
  e.preventDefault();

  currentAccount = accounts.find((el) => 
    el.username === inputLoginUsername.value
  )
  if(currentAccount?.pin === Number(inputLoginPin.value)){
     labelDate.innerHTML = new Intl.DateTimeFormat(currentAccount.locale).format(new Date())
     containerApp.classList.add('app')
     containerApp.style.opacity = 100
    document.querySelector('.try-again-cont').style.opacity = 0;
     inputLoginPin.blur();
     inputLoginUsername.value = inputLoginPin.value = "";
     labelWelcome.textContent = `Welcome Back! ${currentAccount.owner.split(' ')[0]}`;

     if(timer) clearInterval(timer)

     timer = setLogOutTimer();
     updateUI(currentAccount)
  }
  else{
    document.querySelector('.try-again-cont').style.opacity = 100;
    containerApp.style.opacity = 0;
    inputLoginPin.blur();
    inputLoginUsername.value = inputLoginPin.value = "";
  }
     

})


const valueExtract = function (str){
  let arr = [];
  for(let a of str){
    if(Number(a) || a==0){
      if (a == ".")
      return Number(arr.join(''))
      
      arr.push(a)
    }
  }

  return Number(arr.join(''))
}



btnTransfer.addEventListener('click',(e)=>{
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount =  accounts.find(acc=>acc.username==inputTransferTo.value);
  if(recieverAccount && (amount>0 && amount<valueExtract(labelBalance.textContent)) && recieverAccount?.username != currentAccount.username){

  currentAccount.movements.push(Number('-' + inputTransferAmount.value))

  recieverAccount.movements.push(Number(inputTransferAmount.value))

  currentAccount.movementsDates.push(new Date().toISOString())

  recieverAccount.movementsDates.push(new Date().toISOString())

  updateUI(currentAccount)
  inputTransferAmount.value = inputTransferTo.value = "";

  if(timer) clearInterval(timer)
  timer = setLogOutTimer();
  }
  else{
    alert("Kindly enter respectable amount :-) or Correct username")
  }
})


btnClose.addEventListener('click',(e)=>{
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closepin = inputClosePin.value;
  const closeAccIndex = accounts.findIndex(acc=>acc.username == closeUsername);
  if(accounts[closeAccIndex]?.pin==closepin  && confirm('Are You sure?'))
  {
    accounts.splice(closeAccIndex,1)
    containerApp.style.opacity = 0;

  }
  else{
    alert("Please Enter correct details")
  }

  inputCloseUsername.value = inputClosePin.value = "";
})

btnLoan.addEventListener('click',(e)=>{
  e.preventDefault();
  if(currentAccount.movements.some(mov=>mov>(Number(inputLoanAmount.value)*0.1))){

    setTimeout(()=>{
    currentAccount.movements.push(Math.floor(+(inputLoanAmount.value)))
    currentAccount.movementsDates.push(new Date().toISOString())
    updateUI(currentAccount)
    inputLoanAmount.blur();

    inputLoanAmount.value = ""
    },2500)

    if(timer) clearInterval(timer)

     timer = setLogOutTimer();
  }
  else{
    alert("Sorry! Your Account is not eligible for this loan :(")
    inputLoanAmount.value = ""

  }
})

let sort = false;
btnSort.addEventListener('click',()=>{
     sort = !sort
     displayMovements(currentAccount,sort) 
     
})
createUsernames(accounts)










