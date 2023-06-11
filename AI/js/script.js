//Mobile-header

const iconClose = document.querySelector(".nav-icon-close");
const iconOpen = document.querySelector(".nav-icon-open");

const navMobile = document.querySelector(".nav-mobile");

iconOpen.addEventListener("click", function () {
  iconOpen.classList.toggle("clicked");
  iconClose.classList.toggle("clicked");
  navMobile.classList.add("clicked");
});

iconClose.addEventListener("click", function () {
  iconClose.classList.toggle("clicked");
  iconOpen.classList.toggle("clicked");
  navMobile.classList.remove("clicked");
});

// Q&A

//先選取所有q-item
const qItem = document.querySelectorAll(".qa-item");

//用forEach準備對所有qitem加上監聽器
qItem.forEach(function (currentQ) {
  currentQ.addEventListener("click", function () {
    currentQ.classList.toggle("show-answer");

    // qItem.forEach(function (otherQ) {
    //   if (otherQ !== currentQ) {
    //     otherQ.classList.remove("show-text");
    //   }
    // });
  });
});

// BACK TO TOP BTN
$(document).ready(function () {
  //MOBILE
  $(".btn-return").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
});

//Testmonial
const testmonialBtns = document.querySelectorAll(".check-btn");
const testmonialUsers = document.querySelectorAll(".testmonial-card");

testmonialBtns.forEach(function (currentBtn) {
  currentBtn.addEventListener("click", function () {
    currentBtn.classList.add("check-btn-on");

    testmonialUsers.forEach(function (currentUser) {
      const dataUser = currentUser.dataset.user;
      const dataCheck = currentBtn.dataset.check;
      if (dataCheck !== dataUser) {
        currentUser.classList.remove("testmonial-card-show");
      } else {
        currentUser.classList.add("testmonial-card-show");
      }
    });

    testmonialBtns.forEach(function (others) {
      if (currentBtn !== others) {
        others.classList.remove("check-btn-on");
      }
    });
  });
});

/* 側邊篩選按鈕 */
const filterBtnLeft = document.getElementById("filter-left");
const filterBtnRight = document.getElementById("filter-right");

const filterListLeft = document.querySelector(".filter-left-click");
const filterListRight = document.querySelector(".filter-right-click");

filterBtnLeft.addEventListener("click", function () {
  filterListLeft.classList.toggle("clicked");
});

filterBtnRight.addEventListener("click", function () {
  filterListRight.classList.toggle("clicked");
});

const products = document.querySelectorAll(".product-item");

const btnAI = document.querySelectorAll(".filter-ai");
const btnType = document.querySelectorAll(".filter-type");

btnAI.forEach(function (btn) {
  btn.addEventListener("click", filterAI);
});

btnType.forEach(function (btn) {
  btn.addEventListener("click", filterType);
});

function filterAI(e) {
  products.forEach((product) => {
    //把每個product加入兩個class
    product.classList.remove("product-display-none");
    product.classList.add("product-selected");

    //取出每個product的dataset
    const dataProductAI = product.dataset.ai;
    //取出該BTN的dataset
    const dataBtnAI = e.target.dataset.ai;

    //如果data內容不同，就不顯示該product
    if (dataBtnAI !== dataProductAI) {
      product.classList.remove("product-selected");
      product.classList.add("product-display-none");
    }

    btnAI[0].addEventListener("click", (e) => {
      products.forEach((product) => {
        product.classList.remove("product-display-none");
        product.classList.add("product-selected");
      });
    });
  });
}

function filterType(e) {
  products.forEach((product) => {
    //把每個product加入兩個class
    product.classList.remove("product-display-none");
    product.classList.add("product-selected");

    //取出每個product的dataset
    const dataProduct = product.dataset.item;
    //取出該BTN的dataset
    const dataBtn = e.target.dataset.type;

    //如果data內容不同，就不顯示該product
    if (dataBtn !== dataProduct) {
      product.classList.remove("product-selected");
      product.classList.add("product-display-none");
    }

    btnType[0].addEventListener("click", (e) => {
      products.forEach((product) => {
        product.classList.remove("product-display-none");
        product.classList.add("product-selected");
      });
    });
  });
}
/*
//Product-filter

//1. 選取所有Category裡的btn以及product


//2. 為所有BTN加上事件監聽器
btns.forEach((curBtn) => {
  curBtn.addEventListener("click", filterProduct);
});

//3. 設置被點擊的btn樣式
function setActiveBtn(e) {
  //移除所有btn裡的clicked class
  btns.forEach((btn) => {
    btn.classList.remove("btn-category-clicked");
  });

  e.target.classList.add("btn-category-clicked");
}

//4. Filter product 篩選product
function filterProduct(e) {
  //run the activeBtn function
  setActiveBtn(e);

  //loop through all products
  products.forEach((product) => {
    //把每個product加入兩個class
    product.classList.remove("product-display-none");
    product.classList.add("product-selected");

    //取出每個product的dataset
    const dataProduct = product.dataset.item;
    //取出該BTN的dataset
    const dataBtn = e.target.dataset.btn;

    //如果data內容不同，就不顯示該product
    if (dataBtn !== dataProduct) {
      product.classList.remove("product-selected");
      product.classList.add("product-display-none");
    }
  });

  //5. All btn設置，只要btn[0]被點擊，就全部顯示
  btns[0].addEventListener("click", (e) => {
    setActiveBtn(e);

    products.forEach((product) => {
      product.classList.remove("product-display-none");
      product.classList.add("product-selected");
    });
  });
}
*/

/*****************串接API**********************/
//撈取其他學生作品

//1. 發送request給伺服器
//2. 收到response
//3. 渲染到網頁上

// 資料的Domain & route
const apiPath = "https://2023-engineer-camp.zeabur.app";
const route = "/api/v1/works";

//宣告稍後接收資料的變數
//因為資料會變動，所以用let宣告
let worksData = [];
let pagesData = {};

//發送request夾帶資訊 => Query String
const data = {
  type: "",
  //從新到舊 => 0
  sort: 0,
  page: 1,
  search: "",
};

//Sent REQUEST function 發送request的function
/*
function getData({ type, sort, page, search }) {
  let apiURL = `${apiPath}${route}?sort=${sort}&page=${page}&type=${
    type ? `type=${type}` : ""
  }&${search ? `search=${search}` : ""}`;

  axios.get(apiURL).then(function (response) {
    //把response 印出，確認有get到資料
    //console.log(response);

    //把reponse的內容指派到剛宣告的變數裡以便存取使用
    worksData = response.data.ai_works.data;
    pagesData = response.data.ai_works.page;

    //把內容印出，確認有get到資料
    console.log(worksData);
    console.log(pagesData);

    //進一步渲染網頁
    //render Products
    render();
    //render Pages
    renderPages();
  });
}

getData(data);

//網頁載入時進行分類渲染判斷

//中間filter-mid UL
let filterMid = document.querySelector(".filter-mid");
//左邊filter-type
let filterListType = document.querySelector(".filter-list-type");
//filter-ai
let filterListAI = document.querySelector(".filter-list-ai");

window.onload = function () {
  let type = new Set();
  let ai = new Set();
  let categoriesOuter = '<li class="btn-category">全部</li>';
  let categoriesInner = '<li class="filter-type">所有類型</li>';
  let aiInner = '<li class="filter-ai">所有模型</li>';

  worksData.forEach((item) => {
    type.add(item.type);
    ai.add(item.discordId);
  });
  console.log(type);

  type.forEach((item) => {
    categoriesOuter += `<li class="btn-category">${item}</li>`;
    categoriesInner += `<li class="filter-type">${item}</li>`;
  });

  ai.forEach((item) => {
    aiInner += `<li class="filter-ai">${item}</li>`;
  });

  filterMid.innerHTML = categoriesOuter;
  filterListType = categoriesInner;
  filterListAI = aiInner;
};
*/

function getData({ type, sort, page, search }) {
  let apiURL = `${apiPath}${route}?sort=${sort}&page=${page}&type=${
    type ? `type=${type}` : ""
  }${search ? `search=&${search}` : ""}`;

  axios.get(apiURL).then(function (response) {
    // 把response 印出，確認有get到資料
    console.log(response);

    // 把reponse的內容指派到剛宣告的變數裡以便存取使用
    worksData = response.data.ai_works.data;
    pagesData = response.data.ai_works.page;

    // 把內容印出，確認有get到資料
    console.log(worksData);
    console.log(pagesData);

    // 進一步渲染網頁
    // render Products
    render();
    // render Pages
    renderPages();
    renderModel();
  });
}

getData(data);

/////////////////////渲染網頁函式/////////////////////////
//選取外層ul => products & pagination
const productsList = document.querySelector(".products");
function render() {
  //宣告變數接下等等要加入ProductsList裡的HTML超文本
  let product = "";

  //把getData裡拿到的資料worksData加進ProductsList裡面
  //curData參數代表迴圈裡的每個data
  worksData.forEach((curData) => {
    console.log("render");
    //products
    product += `<li class="product-item" data-ai="卡卡" data-item="${curData.type}" >
    <div class="product-img">
      <a href="${curData.link}">
      <img
        src=${curData.imageUrl}
        alt="工具圖片-${curData.title}"
        class="img-product"
      />
      </a>
    </div>
    <div class="product-info">
      <h4><a href="${curData.link}" target="_blank" class="heading-quaternary">${curData.title}</a></h4>
      <p class="description-small description-intro font-gray">
        ${curData.description}
      </p>
    </div>
    <div class="product-tag-top">
      <span class="description-regular font-bold">AI 模型</span>
      <span class="description-regular">${curData.model}</span>
    </div>
    <div class="product-tag-bottom">
      <span class="description-regular">#${curData.type}</span>
      <span class="material-symbols-outlined icon icon-dark">
        share
      </span>
    </div>
  </li>`;
  });
  productsList.innerHTML = product;
}

///////////////////切換類別//////////////////////////////

const btnsCategoriesOuter = document.querySelectorAll(".btn-category");
btnsCategoriesOuter.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.textContent === "全部") {
      data.type = "";
    } else {
      data.type = item.textContent;
    }
    getData(data);
  });
});

/////////////////渲染discordID/////////////////////////
const filterListAI = document.querySelector(".filter-list-ai");

function renderModel() {
  let ai = new Set();
  let aiSt = '<li class="filter-ai">所有模型</li>';
  worksData.forEach((item) => {
    ai.add(item.discordId);
  });

  ai.forEach((item) => {
    aiSt += `<li class="filter-ai">${item}</li>`;
  });

  filterListAI.innerHTML = aiSt;
}

//////////////////////切換分頁//////////////////////////
const paginations = document.querySelector(".paginations");
function changePage(pagesData) {
  const pageLinks = document.querySelectorAll(".pagination-item");
  let pageId = "";

  pageLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);

      if (!pageId) {
        data.page = Number(pagesData.current_page) + 1;
      }
      getData(data);
    });
  });
}

//////////////////////分頁渲染/////////////////////////
function renderPages() {
  let pageStr = "";

  for (let i = 1; i <= pagesData.total_pages; i++) {
    pageStr += `<li class="pagination-item ${
      pagesData.current_page == i ? "pagination-item-active" : ""
    }" data-page="${i}">${i}</li>`;
  }

  if (pagesData.has_next) {
    pageStr += `<li class="pagination-item">
    <span class="material-symbols-outlined icon icon-dark">
          expand_more
    </span>
    </li>`;
  }

  paginations.innerHTML = pageStr;
  changePage(pagesData);
}

/////////////////////////作品類別渲染/////////////////////////

/////////////////切換作品順序///////////////////////
//點選篩選從新到舊或舊到新
//1. 先宣告按鈕變數，選取到網頁上的篩選按鈕
//2. 為按鈕加上事件監聽
//3. 改變data裡面的sort
//4. 進行全部排版 = 呼叫getdata
const sortNewToOld = document.getElementById("sort0");
const sortOldToNew = document.getElementById("sort_1");

//從新到舊 => sort = 0
if (sortNewToOld) {
  sortNewToOld.addEventListener("click", (e) => {
    e.preventDefault();
    data.sort = 0;
    getData(data);
    filterBtnRight.innerHTML =
      '<span class="btn-filter-text">由新到舊</span><span class="material-symbols-outlined icon icon-dark">expand_more</span>';
  });
}

//由舊到新 => sort = 1
if (sortOldToNew) {
  sortOldToNew.addEventListener("click", (e) => {
    e.preventDefault();
    data.sort = 1;
    getData(data);
    filterBtnRight.innerHTML =
      '<span class="btn-filter-text">由舊到新</span><span class="material-symbols-outlined icon icon-dark">expand_more</span>';
  });
}
/*
////////////////切換分類//////////////////
//找不到節點
//外層categories
const btns = document.querySelectorAll(".btn-category");
console.log(btns);
btns.forEach((item) => {
  //用forEach把所有按鈕都加上監聽器
  item.addEventListener("click", () => {
    console.log(item.textContent);
    if (item.textContent === "全部") {
      //如果點擊的按鈕為全部
      data.type = "";
    } else {
      //否則data = 點擊的按鈕
      data.type = item.textContent;
    }
    //只給你該類別的資訊
    getData(data);
  });
});

//內層categories
const btnsCategoriesInner = document.querySelectorAll(".filter-type");
const btnsFilterAI = document.querySelectorAll(".filter-ai");

btnsCategoriesInner.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.textContent === "所有類型") {
      data.type = "";
    } else {
      data.type = item.textContent;
    }
    getData(data);
  });
});
*/
//////////////////搜尋//////////////////////
const search = document.querySelector("#searching-bar");
search.addEventListener("keydown", (e) => {
  console.log(search.value);
  if (e.keyCode === 13) {
    data.search = search.value;
    data.page = 1;
    getData(data);
  }
});

////////////////SWIPER////////////////////
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    650: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    750: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    850: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    950: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
