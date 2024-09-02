$(document).ready(function () {
    (function (w) {
        w.SelectingList = (window.SelectingList || {
            elem: {
                select: $('select[name="type_val"]')[0],
                sells: $('input[type="text"]'),
                buttons: $('input[type^="button"]'),
                p: $('p')
            },
            Init: function () {
                this.HideEmpty();
                this.Events();
                this.ShowInput(this.elem.select.value);
                this.ShowButtons(this.elem.select.value);
            },
            Events: function () {
                $(this.elem.select).on('change', function () {
                    w.SelectingList.ShowInput(this.value);
                    w.SelectingList.ShowButtons(this.value);
                });
            },
            ShowInput: function (value) {
                for (let i of this.elem.sells) {
                    var regex = new RegExp(value);
                    if ("/["+value+"]/", regex.test($(i).attr('name'))) {
                        i.parentElement.style.display = "inline-block";
                    }
                    else {
                        i.parentElement.style.display = "none";
                    }
                }
                this.value
            },
            ShowButtons: function (value) {
                for (let i of this.elem.buttons) {
                    var regex = new RegExp(value);
                    if ("/["+value+"]/", regex.test($(i).attr('name'))) {
                        i.style.display = "inline-block";
                    }
                    else {
                        i.style.display = "none";
                    }
                }
                this.value
            },
            HideEmpty: function () {
                for (let i of this.elem.p) {
                    if (i.outerHTML === "<p>&nbsp;</p>") {
                        i.style.display = 'none';
                    };
                }
            }
        });
    })(window)

    SelectingList.Init();
 });