(function ($) {
  $.extend({
    uploadPreview : function (options) {

      // Options + Defaults
      var settings = $.extend({
        input_field: ".image-input",
        preview_box: ".image-preview",
        label_field: ".image-label",
        label_default: "Choose File",
        label_selected: "Change File",
        no_label: false,
        success_callback : null,
      }, options);

      // Check if FileReader is available
      if (window.File && window.FileList && window.FileReader) {
        if (typeof($(settings.input_field)) !== 'undefined' && $(settings.input_field) !== null) {
          $(settings.input_field).change(function() {
            var files = this.files;
            if (files.length > 0) {
              var file = files[0];
              var reader = new FileReader();

              // Load file
              reader.addEventListener("load",function(event) {
                var loadedFile = event.target;

                var iSize = (file.size / 1024);
                var sizeType = '';
                var sizeAllow = true;
                if (iSize / 1024 > 1){
                  if (((iSize / 1024) / 1024) > 1){
                    iSize = (Math.round(((iSize / 1024) / 1024) * 100) / 100);
                    sizeType = 'gb';
                    sizeAllow = false;
                  }
                  else{
                    iSize = (Math.round((iSize / 1024) * 100) / 100);
                    if(iSize > 7){
                      sizeAllow = false;
                    }
                    sizeType = 'mb';
                  }
                }
                else{
                  iSize = (Math.round(iSize * 100) / 100);
                  sizeType = 'kb';
                }
                // Check format
                if (file.type.match('image') && sizeAllow == true) {
                  // Image
                  $(settings.preview_box).css("background-image", "url("+loadedFile.result+")");
                  $(settings.preview_box).css("background-repeat", "no-repeat");
                  $(settings.preview_box).css("background-size", "contain");
                  $(settings.preview_box).css("background-position", "center center");
                }
              });

              if (settings.no_label == false) {
                // Change label
                $(settings.label_field).html(settings.label_selected);
              }

              // Read the file
              reader.readAsDataURL(file);

              // Success callback function call
              if(settings.success_callback) {
                settings.success_callback();
              }
            } else {
              if (settings.no_label == false) {
                // Change label
                $(settings.label_field).html(settings.label_default);
              }

              // Clear background
              // $(settings.preview_box).css("background-image", "none");

              // Remove Audio
              // $(settings.preview_box + " audio").remove();
            }
          });
        }
      } else {
        alert("You need a browser with file reader support, to use this form properly.");
        return false;
      }
    }
  });
})(jQuery);