const next = document.getElementById("next");
const body = document.getElementsByTagName("body")[0];
const firstForm = document.getElementById("firstForm");
const secondForm = document.getElementById("secondForm");
const calculate = document.getElementById("calculate");
const back = document.getElementById("back");

var noOfGens = 0;
var totalDemand = 0;
var i = 1;

next.addEventListener("click", function () {
  firstForm.style.display = "none";
  next.style.display = "none";
  secondForm.style.display = "block";

  var M = document.getElementById("genNumbers").value;
  noOfGens = M;
  var D = document.getElementById("power").value;
  totalDemand = D;

  while (i <= M) {
    secondForm.innerHTML += `
    <div class="genMain">
    <div class="genHead"><span>Generator ${i}</span></div>
    <form id="firstForm"  class="genForm"  >
  
      <div class="form-group genIn"  >
          <label  for="paramA">A</label>
          <input type="number" class="form-control paramA" style="border: none;" placeholder="Enter A">
      </div>
  
      <div class="form-group genIn">
          <label for="paramB">B</label>
          <input type="number" class="form-control paramB" style="border: none;" placeholder="Enter B ">
      </div>
  
      <div class="form-group genIn">
          <label for="paramC">C</label>
          <input type="number" class="form-control paramC" style="border: none;" placeholder="Enter C ">
      </div>
  
      <div class="form-group genIn">
          <label for="Pmin">Pmin</label>
          <input type="number" class="form-control Pmin" style="border: none;" placeholder="Enter Pmin">
      </div>
  
      <div class="form-group genIn">
          <label for="Pmax">Pmax</label>
          <input type="number" class="form-control Pmax" style="border: none;" placeholder="Enter Pmax">
      </div>
      
  </form>
  </div>
`;
    i++;
  }
  calculate.style.display = "block";
  back.style.display = "block";
});

back.addEventListener("click", function () {
  firstForm.style.display = "block";
  next.style.display = "block";
  secondForm.style.display = "none";
  calculate.style.display = "none";
  back.style.display = "none";
});

calculate.addEventListener("click", function () {
  secondForm.style.display = "none";
  const result = document.getElementById("result");
  console.log(result);
  result.innerHTML = `<h3>Economic Dispatch<\h3>`;

  lambdan();
});

function lambdan() {
  var paramA = document.getElementsByClassName("paramA");
  var paramB = document.getElementsByClassName("paramB");
  var paramC = document.getElementsByClassName("paramC");
  var Pmin = document.getElementsByClassName("Pmin");
  var Pmax = document.getElementsByClassName("Pmax");

  let paramAArray = [];
  for (var i = 0; i < paramA.length; i++) {
    paramAArray.push(paramA[i].value);
  }

  let paramBArray = [];
  for (var i = 0; i < paramB.length; i++) {
    paramBArray.push(paramB[i].value);
  }

  let paramCArray = [];
  for (var i = 0; i < paramC.length; i++) {
    paramCArray.push(paramC[i].value);
  }

  //algorithm
  var lambda = Math.max(...paramBArray);
  var delP = -1;
  var j = 0;
  var P = [];

  while (delP != 0) {
    var pSum = 0;
    var denominator = 0;
    for (var i = 0; i < noOfGens; i++) {
      P[i] = (lambda - paramBArray[i]) / (2 * paramCArray[i]);

      if (P[i] >= Pmax[i]) {
        P[i] = Pmax[i];
      } else if (P[i] <= Pmin[i]) {
        P[i] = Pmin[i];
      } else {
        P[i] = P[i];
      }

      denominator += 1 / (2 * paramCArray[i]);
      pSum = pSum + P[i];
    }

    delP = totalDemand - pSum;
    var delLambda = delP / denominator;
    lambda = lambda + delLambda;
    j = j + 1;

    if (j === 1000) {
      break;
    }
  }
  console.log("P= " + P.map((x) => Math.round(x)));
  console.log("lambda= " + lambda);

  var c = [];

  for (var i = 0; i < noOfGens; i++) {
    c[i] =
      paramAArray[i] +
      paramBArray[i] * P[i] +
      paramCArray[i] * Math.pow(P[i], 2);
  }

  console.log(c);
  c.map((x) => Math.round(x));
  // const cost = c.reduce((a, b) => a + b, 0);
  const initialValue = 0.0;
  const cost = c.reduce(
    (accumulator, currentValue) => accumulator + parseFloat(currentValue, 10),
    initialValue
  );
  console.log(cost);
}
