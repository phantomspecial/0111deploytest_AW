$(document).on('turbolinks:load', function () {
  var replaceSelectOptions = function replaceSelectOptions($select, results) {
    $select.html($('<option>'));
    return $.each(results, function () {
      var option = $('<option>').val(this.id).text(this.name);
      return $select.append(option);
    });
  };

  var replaceChildrenOptions = function replaceChildrenOptions() {
    var _$$find$data = $(this).find('option:selected').data(),
        childrenPath = _$$find$data.childrenPath;

    var $selectChildren = $(this).closest('form').find('.select-children');
    if (childrenPath != null) {
      return $.ajax({
        url: childrenPath,
        dataType: "json",
        success: function success(results) {
          return replaceSelectOptions($selectChildren, results);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          console.error("Error occurred in replaceChildrenOptions");
          console.log('XMLHttpRequest: ' + XMLHttpRequest.status);
          console.log('textStatus: ' + textStatus);
          return console.log('errorThrown: ' + errorThrown);
        }
      });
    } else {
      return replaceSelectOptions($selectChildren, []);
    }
  };

    return $('.select-parent').on({
    'change': replaceChildrenOptions});
    });

    window.onload = function(){
    var category = $('.select-parent').val();
    document.getElementById('.category_js').selectedIndex = category;
    };

    window.onload = function(){
    var subcategory = $('.select-children').val();
    document.getElementById('.sub_category_js').selectedIndex = subcategory;
    };

