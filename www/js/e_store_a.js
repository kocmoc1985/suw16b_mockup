$(document).ready(function () {
    go();
});



function getSideBarArray() {
    var sideBarArr = ["Laptops", "Smartphones", "TV's"];
    return sideBarArr;
}

function getImagesSpecialOfferArray() {
    var sideBarArr = ["images/bear.png", "images/blogg.jpg", "images/chat_smile.png"];
    return sideBarArr;
}

function getProductsArray() {
    var products = getJsonFromUrlSync("json/e_store_a/products.json");
    return products.products;
}

function go() {

    includeHtml("templates/estore_a/controls.html", "#controls");

    includeHtml("templates/estore_a/initial.html", "#e-store-a-content");

    loginBtnClicked();

    addSideBarEntries(getSideBarArray());

    sideBarLinkCliked();

    buildSpecialOffers(getImagesSpecialOfferArray());

    specialOfferClicked();
}

function findProduct(productsArr, productId) {
    //
    for (var i = 0; productsArr.length; i++) {
        var curr = productsArr[i];
        if (curr.id === ""+productId) {
            return curr;
        }
    }
    //
    return null;
}

function openProductPage(productsArr, productId) {
    //
    $("#content-col").empty();
    //
    var product = findProduct(productsArr,productId);
    //
    var productObj = $(loadHtml("templates/estore_a/productPage.html"));
    //
    $(productObj).find(".product-title").text(product.title);
    //
    $("#content-col").append(productObj);
}

function specialOfferClicked() {
    $("#special-offers .item").click(function () {
        openProductPage(getProductsArray(), 1);
    });
}

function buildSpecialOffers(imagesArr) {
    //
    var first_flag = true;
    //
    var carouselTemplateObj = $(loadHtml("templates/estore_a/specialof.html"));
    //
    for (var i = 0; i < imagesArr.length; i++) {
        //
        var imgTemplateObj = $(loadHtml("templates/estore_a/specialof_img.html"));
        //
        $(imgTemplateObj).find("img").attr("src", imagesArr[i]);
        $(imgTemplateObj).find("img").attr("alt", imagesArr[i]);
        //
        $(carouselTemplateObj).find("#carousel-images").append(imgTemplateObj);
    }
    //
    if (first_flag) {
        $(carouselTemplateObj).find(".item").first().addClass("active");
        first_flag = false;
    }
    //
    $("#special-offers").append(carouselTemplateObj);
    //
    $("#carousel-example-generic").height("400px");
}

function addSideBarEntries(arr) {
    //
    for (var i = 0; i < arr.length; i++) {
        //
        var template = loadHtml("templates/estore_a/sidebarentry.html");
        //
        var obj = $.parseHTML(template);
        //
        $(obj).find("p").text(arr[i]);
        //
        $("#sidebar").append(obj);
        //
    }
    //
}

function sideBarLinkCliked() {
    $(".sidebar-entry").click(function () {
        console.log("aaa");
        $(this).find("p").text("clicked");
    });
}

function loginBtnClicked() {
    $("#login-btn").click(function () {
        $("#e-store-a-content").empty();
        includeHtml("templates/estore_a/login.html", "#e-store-a-content");
    });
}

function sameHightAsParent(selector) {
    var parentHeight = $(selector).parent().height();
    $(selector).height(parentHeight);
}

function sameHeightSameClasses(class_) {
    var elemsArr = $(class_);
    //
    var max = 0;
    //
    for (var i = 0; i < elemsArr.length; i++) {
        //
        var currHeight = $(elemsArr[i]).height();
        //
        if (currHeight > max) {
            max = currHeight;
        }
    }
    //
    for (var i = 0; i < elemsArr.length; i++) {
        $(elemsArr[i]).height(max);
    }
    //
}