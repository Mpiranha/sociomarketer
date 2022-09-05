var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "ana-select": */
// x = document.getElementsByClassName("ana-select");
// l = x.length;
for (i = 0; i < l; i++) {
  // selElmnt = x[i].getElementsByTagName("select")[0];
  //ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */

  // a = document.createElement("DIV");
  // a.setAttribute("class", "ana-select-selected");
  // a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  // x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  // b = document.createElement("DIV");
  // b.setAttribute("class", "ana-select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    // c = document.createElement("DIV");
    // c.innerHTML = selElmnt.options[j].innerHTML;
    // c.addEventListener("click", function(e) {
    //     /* When an item is clicked, update the original select box,
    //     and the selected item: */
    //     var y, i, k, s, h, sl, yl;
    //     s = this.parentNode.parentNode.getElementsByTagName("select")[0];
    //     sl = s.length;
    //     h = this.parentNode.previousSibling;
    //     for (i = 0; i < sl; i++) {
    //       if (s.options[i].innerHTML == this.innerHTML) {
    //         s.selectedIndex = i;
    //         h.innerHTML = this.innerHTML;
    //         y = this.parentNode.getElementsByClassName("ana-same-as-selected");
    //         yl = y.length;
    //         for (k = 0; k < yl; k++) {
    //           y[k].removeAttribute("class");
    //         }
    //         this.setAttribute("class", "ana-same-as-selected");
    //         break;
    //       }
    //     }
    //     h.click();
    // });
    // b.appendChild(c);
  }
  x[i].appendChild(b);
  $('.ana-select-selected').on("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    // this.classList.toggle("select-arrow-active");
  });
}

$('.ana-select-selected').each(function () {
  let me = $(this);

  $(this).siblings('.ana-select-items').children().children().each(function () {

    $(this).on("click", function () {

      removeAllActive(me.siblings('.ana-select-items').find('.soc-act-item'), 'ana-same-as-selected');
      me.find('.text-holder').text($(this).attr('value'));
      me.siblings('.select-value').val($(this).attr('value'));

      $(this).addClass('ana-same-as-selected');

    });
  });

  let removeAllActive = (arr, cssClass) => {
    arr.each((indx, elem) => {

      elem.classList.remove(cssClass)
    });
  }


  $(this).on("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    $(this).siblings().toggleClass("select-hide");
    // this.classList.toggle("select-arrow-active");
  });
});

$('.filter-btn').on('click', function (e) {
  e.preventDefault();
  let dropStyle;
  $(this).siblings('.dropdown-menu').children('.dropdown-relative-inner').removeClass('arrow-left');
  console.log($(this).parent());
  let offSet = $(this).parent().get()[0].offsetLeft - $(this).parent().get()[0].offsetWidth;
  console.log(offSet);
  if ($(this).parent().get()[0].offsetLeft > 600) {
    dropStyle = {
      position: 'absolute',
      top: '100%',
      right: '0px',
      left: 'initial',
      'will-change': 'transform'
    }
  } else {
    dropStyle = {
      position: 'absolute',
      top: '100%',
      left: '0px',
      'will-change': 'transform'
    }
  
    $(this).siblings('.dropdown-menu').children('.dropdown-relative-inner').addClass('arrow-left');
  }


  $(this).siblings('.dropdown-menu').css(
    dropStyle
  );

  $(this).siblings('.dropdown-menu').toggleClass('show');
});




function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("ana-select-items");
  y = document.getElementsByClassName("ana-select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);