const next = document.getElementById("next");
const body = document.getElementsByTagName("body")[0];
const firstForm = document.getElementById("firstForm");
const secondForm = document.getElementById("secondForm");
const calculate = document.getElementById("calculate");
const back = document.getElementById("back");
const upform = document.getElementById("upform");
const entMan = document.getElementById("ent-man");
const backHome = document.getElementById("back-home");
const result = document.getElementById("result");

var noOfGens = 0;
var totalDemand = 0;
var i = 1;

next.addEventListener("click", function () {
  firstForm.style.display = "none";
  next.style.display = "none";
  secondForm.style.display = "block";
  backHome.style.display = "none";
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
  result.style.display = "none";
  backHome.style.display = "block";
  stOver.style.display = "none";
});
const stOver = document.getElementById("stOver");
calculate.addEventListener("click", function () {
  secondForm.style.display = "none";
  result.style.display = "block";
  calculate.style.display = "none";
  stOver.style.display = "block";
  lambdaIteration();
});

function lambdaIterationAlgo(
  paramAArray,
  paramBArray,
  paramCArray,
  Pmax,
  Pmin,
  noOfgens,
  totaldemand
) {
  var lambda = Math.max(...paramBArray);
  // console.log(lambda);
  var delP = -1;
  var j = 0;
  var P = [];
  console.log(paramAArray);
  console.log(paramBArray);
  console.log(paramCArray);
  console.log(Pmax);
  console.log(Pmin);
  console.log(totaldemand);
  console.log(noOfgens);
  while (delP != 0) {
    var pSum = 0;
    var denominator = 0;
    for (var i = 0; i < noOfgens; i++) {
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

    delP = totaldemand - pSum;
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

  for (var i = 0; i < noOfgens; i++) {
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
  return {
    totalCost: cost,
    power: P,
    cost: c,
  };
}
function lambdaIteration() {
  var paramA = document.getElementsByClassName("paramA");
  var paramB = document.getElementsByClassName("paramB");
  var paramC = document.getElementsByClassName("paramC");
  var Pmin = document.getElementsByClassName("Pmin");
  var Pmax = document.getElementsByClassName("Pmax");

  let paramAArray = [];
  for (var i = 0; i < paramA.length; i++) {
    paramAArray.push(parseFloat(paramA[i].value));
  }

  let paramBArray = [];
  for (var i = 0; i < paramB.length; i++) {
    paramBArray.push(parseFloat(paramB[i].value));
  }

  let paramCArray = [];
  for (var i = 0; i < paramC.length; i++) {
    paramCArray.push(parseFloat(paramC[i].value));
  }
  let pmin = [];
  for (var i = 0; i < Pmin.length; i++) {
    pmin.push(parseFloat(Pmin[i].value));
  }
  let pmax = [];
  for (var i = 0; i < Pmax.length; i++) {
    pmax.push(parseFloat(Pmax[i].value));
  }
  const resFrom = lambdaIterationAlgo(
    paramAArray,
    paramBArray,
    paramCArray,
    pmax,
    pmin,
    parseFloat(noOfGens),
    parseFloat(totalDemand)
  );
  console.log(resFrom);
  let resInnerHtml = `
  <div  style="height: auto; width: 100%;margin: 0;">
      <div
        class="center_div my-5 rounded bg-white d-flex flex-column justify-content-around " id='cenRes'
      >
        <div class="resHead">
          <div style="font-weight: bold;margin-right: 25%;">
            Total Power
            <div style="text-align: center; font-weight: 400">${parseFloat(totalDemand).toFixed(2) } <span style='font-weight:200'>W</span></div>
          </div>
          <div style="font-weight: bold">
            Total Cost
            <div style="text-align: center; font-weight: 400">  <span style='font-weight:500'>&#8377; </span> ${parseFloat(resFrom.totalCost).toFixed(2)}</div>
          </div>
        </div>
        <div
          class="w-100 h-auto resDiv"
          style="background-color: inherit; margin-bottom: 10px"
        >
  `;
  for (let i in resFrom.cost) {
    resInnerHtml += `
    <div class="rounded resIt">
            <span class="resSpan rounded">P${parseInt(i) + 1} ${
      resFrom.power[i].toFixed(2)
    }<span style='font-weight:200'> W</span> </span>
            <span class="resSpan rounded"><span style='font-weight:500'>&#8377; </span>  ${
      resFrom.cost[i].toFixed(2)
    }</span>
          </div>
    `;
  }
  resInnerHtml += `
  </div>
  </div>
</div>
</div>
  `;
  result.innerHTML = resInnerHtml;
}

function csvToArray(str, delimiter = ",") {
  const someData = [];

  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  const a = headers[0];
  const b = headers[1];

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);

    someData.push(values);
  });

  return [a, b, someData];
}

let a, b;
let data;

document.getElementById("inputfile").addEventListener("change", function (e) {
  result.style.display = "block";
  upform.style.display = "none";
  stOver.style.display = "block";
  let allFiles = e.target.files;
  let resFrom = {};
  for (var i = 0; i < allFiles.length; i++) {
    var reader = new FileReader();

    reader.readAsText(allFiles[0]);

    reader.onload = function (e) {
      const [first, second, metaData] = csvToArray(e.target.result);

      a = first;
      b = second;
      data = metaData;
      let pa = [];
      let pb = [];
      let pc = [];
      let pmin = [];
      let pmax = [];
      for (let d of data) {
        pa.push(parseFloat(d[0]));
        pb.push(parseFloat(d[1]));
        pc.push(parseFloat(d[2]));
        pmax.push(parseFloat(d[4]));
        pmin.push(parseFloat(d[3]));
      }

      resFrom = lambdaIterationAlgo(pa, pb, pc, pmax, pmin, parseInt(a), parseFloat(b));

      let resInnerHtml = `
      <div  style="height: auto; width: 100%;margin: 0;">
      <div
        class="center_div my-5 rounded bg-white d-flex flex-column justify-content-around w-80" id='cenRes'
      >
        <div class="resHead">
          <div style="font-weight: bold;margin-right: 25%;">
            Total Power
            <div style="text-align: center; font-weight: 400">${parseFloat(b).toFixed(2)} <span style='font-weight:200'>W</span></div>
          </div>
          <div style="font-weight: bold">
            Total Cost
            <div style="text-align: center; font-weight: 400">  <span style='font-weight:500 '>&#8377; </span>${parseFloat(resFrom.totalCost).toFixed(2)} </div>
          </div>
        </div>
        <div
          class="w-100 h-auto resDiv"
          style="background-color: inherit; margin-bottom: 10px"
        >
  `;
      for (let i in resFrom.cost) {
        resInnerHtml += `
    <div class="rounded resIt">
            <span class="resSpan rounded">P${parseInt(i) + 1} ${
          resFrom.power[i].toFixed(2) 
        } <span style='font-weight:200'> W</span></span>
            <span class="resSpan rounded"><span style='font-weight:500'>&#8377; </span>  ${
          resFrom.cost[i].toFixed(2)
        }</span>
          </div>
    `;
      }
      resInnerHtml += `
  </div>
  </div>
</div>
</div>
  `;
      result.innerHTML = resInnerHtml;
    };
  }

});

document.getElementById("ent-man").addEventListener("click", function (e) {
  firstForm.style.display = "block";
  next.style.display = "block";
  upform.style.display = "none";
  entMan.style.display = "none";
  backHome.style.display = "block";
});
document.getElementById("back-home").addEventListener("click", function (e) {
  window.location.reload();
});
document.getElementById("stOver").addEventListener("click", function (e) {
  window.location.reload();
});
