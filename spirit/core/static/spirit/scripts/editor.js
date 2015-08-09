// Generated by CoffeeScript 1.7.1

/*
  Markdown editor
  requires: marked.js
 */

(function() {
  var $, Editor,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Editor = (function() {
    Editor.prototype.defaults = {
      boldedText: "bolded text",
      italicisedText: "italicised text",
      listItemText: "list item",
      linkText: "link text",
      linkUrlText: "link url",
      imageText: "image text",
      imageUrlText: "image url"
    };

    function Editor(el, options) {
      this.togglePreview = __bind(this.togglePreview, this);
      this.addImage = __bind(this.addImage, this);
      this.addUrl = __bind(this.addUrl, this);
      this.addList = __bind(this.addList, this);
      this.addItalic = __bind(this.addItalic, this);
      this.addBold = __bind(this.addBold, this);
      this.wrapSelection = __bind(this.wrapSelection, this);
      this.el = $(el);
      this.options = $.extend({}, this.defaults, options);
      this.setUp();
    }

    Editor.prototype.setUp = function() {
      $('.js-box-bold').on('click', this.addBold);
      $('.js-box-italic').on('click', this.addItalic);
      $('.js-box-list').on('click', this.addList);
      $('.js-box-url').on('click', this.addUrl);
      $('.js-box-image').on('click', this.addImage);
      return $('.js-box-preview').on('click', this.togglePreview);
    };

    Editor.prototype.wrapSelection = function(preTxt, postTxt, defaultTxt) {
      var postSelection, preSelection, selection;
      preSelection = this.el.val().substring(0, this.el[0].selectionStart);
      selection = this.el.val().substring(this.el[0].selectionStart, this.el[0].selectionEnd);
      postSelection = this.el.val().substring(this.el[0].selectionEnd);
      if (!selection) {
        selection = defaultTxt;
      }
      return this.el.val(preSelection + preTxt + selection + postTxt + postSelection);
    };

    Editor.prototype.addBold = function() {
      this.wrapSelection("**", "**", this.options.boldedText);
      return false;
    };

    Editor.prototype.addItalic = function() {
      this.wrapSelection("*", "*", this.options.italicisedText);
      return false;
    };

    Editor.prototype.addList = function() {
      this.wrapSelection("\n* ", "", this.options.listItemText);
      return false;
    };

    Editor.prototype.addUrl = function() {
      this.wrapSelection("[", "](" + this.options.linkUrlText + ")", this.options.linkText);
      return false;
    };

    Editor.prototype.addImage = function() {
      this.wrapSelection("![", "](" + this.options.imageUrlText + ")", this.options.imageText);
      return false;
    };

    Editor.prototype.togglePreview = function() {
      var $preview;
      $preview = $('.js-box-preview-content');
      this.el.toggle();
      $preview.toggle();
      $preview.html(marked(this.el.val()));
      return false;
    };

    return Editor;

  })();

  $.fn.extend({
    editor: function(options) {
      return this.each(function() {
        if (!$(this).data('plugin_editor')) {
          return $(this).data('plugin_editor', new Editor(this, options));
        }
      });
    }
  });

  $.fn.editor.Editor = Editor;

}).call(this);

//# sourceMappingURL=editor.map
