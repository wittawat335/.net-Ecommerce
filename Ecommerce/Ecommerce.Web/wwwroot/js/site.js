﻿let _token = localStorage.getItem('token');
$(document).ready(function () {
    $.fn.serializeObjectTable = function () {
        var o = {};

        var table = this.DataTable();
        var a = table.$('input, select').serialize();
        var parms = {};
        var items = a.split("&");
        for (var i = 0; i < items.length; i++) {
            var values = items[i].split("=");
            var key = decodeURIComponent(values.shift());
            var value = values.join("=")
            parms[key] = decodeURIComponent(value);
        }
        return (parms);
        return o;
    };
    $.fn.serializeObject = function () {
        var o = {};
        var disabledInput = this.find(':input:disabled').removeAttr('disabled')
        var a = this.find('input[name],select[name],textarea[name],input[type=file]').not('input[type=hidden]').serializeArray();

        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        disabledInput.attr('disabled', 'disabled');
        return o;
    };
    setNavActive();
    //NavActive();
});
$(document).on('select2:open', function (e) { //ทำให้ select2 autofocus หลังจากที่ click
    document.querySelector(`[aria-controls="select2-${e.target.id}-results"]`).focus();
});
function saveForm(formId, url) {
    var data = $('#' + formId).serializeObject();
    $.post(url, data, function (response) {
        if (response.isSuccess) {
            swalMessage('success', response.message);
            closeModal();
            getList();
        }
        else swalMessageError('error', response.message);
    });
}

function Insert(formId, url) {
    var obj = $('#' + formId).serializeObject();
    $.ajax({
        type: 'POST',
        url: url,
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.isSuccess) {
                swalMessage('success', response.message);
                closeModal();
                getList();
            }
            else Swal.fire(response.message);
        },
        failure: function (error) {

        }
    })
}

function Update(formId, url) {
    var obj = $('#' + formId).serializeObject();
    $.ajax({
        type: 'PUT',
        url: url,
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.isSuccess) {
                swalMessage('success', response.message);
                closeModal();
                getList();
            }
            else Swal.fire(response.message);
        },
        failure: function (error) {

        }
    })
}

function Delete(Id, url) {
    $.ajax({
        type: 'DELETE',
        url: url + Id,
        headers: { 'Authorization': 'bearer ' + _token },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.isSuccess) {
                swalMessage('success', response.message);
                closeModal();
                getList();
            }
            else Swal.fire(response.message);
        },
        failure: function (error) {

        }
    })
}

//------------------------ Modal ---------------------------------
function openPopup(id, action, url, caption) {
    let data = { "id": id, "action": action };
    modalPOST(caption, url, data);
};
function modalPOST(caption, path, data) {
    var url = path;
    $.post(url, data, function (result) {
        $('#modal-dialog > .modal-dialog > .modal-content > .modal-body').html(result);
        showModal(caption);
    });
}
function showModal(caption) {
    $('#modal-dialog > .modal-dialog > .modal-content > .modal-header > .modal-title').text(caption);
    $('#modal-dialog').modal('show');
}
function closeModal() {
    $('#modal-dialog > .modal-dialog > .modal-content > .modal-body').html('');
    $('#modal-dialog > .modal-dialog > .modal-content > .modal-header > .modal-title').text('');
    $('#modal-dialog').modal('hide');
}
//-------------------------------------------------------------------
//------------------------ Modal Lg ---------------------------------
function openPopupLg(id, action, url, caption) {
    let data = { "id": id, "action": action };
    modalLgPOST(caption, url, data);
};
function modalLgPOST(caption, path, data) {
    var url = path;
    $.post(url, data, function (result) {
        $('#modal-lg > .modal-dialog > .modal-content > .modal-body').html(result);
        showModalLg(caption);
    });
}
function showModalLg(caption) {
    $('#modal-lg > .modal-dialog > .modal-content > .modal-header > .modal-title').text(caption);
    $('#modal-lg').modal('show');
}
function closeModalLg() {
    $('#modal-lg > .modal-dialog > .modal-content > .modal-body').html('');
    $('#modal-lg > .modal-dialog > .modal-content > .modal-header > .modal-title').text('');
    $('#modal-lg').modal('hide');
}
//-------------------------------------------------------------------
//------------------------ Modal Xl ---------------------------------
function openPopupXl(id, action, url, caption) {
    let data = { "id": id, "action": action };
    modalXlPOST(caption, url, data);
};
function modaXlPOST(caption, path, data) {
    var url = path;
    $.post(url, data, function (result) {
        $('#modal-xl > .modal-dialog > .modal-content > .modal-body').html(result);
        showModalXl(caption);
    });
}
function showModalXl(caption) {
    $('#modal-xl > .modal-dialog > .modal-content > .modal-header > .modal-title').text(caption);
    $('#modal-xl').modal('show');
}
function closeModalLg() {
    $('#modal-lg > .modal-dialog > .modal-content > .modal-body').html('');
    $('#modal-lg > .modal-dialog > .modal-content > .modal-header > .modal-title').text('');
    $('#modal-lg').modal('hide');
}
//-------------------------------------------------------------------
function modalPOSTV2(caption, path, data, isFull) {
    var url = path;
    $.post(url, data, function (result) {
        $('#modalDialogLv2 > .modal-dialog > .modal-content > .modal-body').html(result);
        showModalLv2(caption, isFull);
    });
}
function showModalLv2(caption, isFull) {
    if (typeof (isFull) === "boolean") {
        if (isFull)
            $('#modalDialogLv2 > .modal-dialog').addClass('modal-full');
        else
            $('#modalDialogLv2 > .modal-dialog').removeClass('modal-full');
    } else {
        if (typeof (isFull) === "number") {
            var x = isFull;
            switch (true) {
                case (x >= 20 && x < 30):
                    $('#modalDialog > .modal-dialog').addClass('modal-20');
                    break;
                case (x >= 30 && x < 40):
                    $('#modalDialog > .modal-dialog').addClass('modal-30');
                    break;
                case (x >= 40 && x < 50):
                    $('#modalDialog > .modal-dialog').addClass('modal-40');
                    break;
                case (x >= 50 && x < 60):
                    $('#modalDialog > .modal-dialog').addClass('modal-50');
                    break;
                case (x >= 60 && x < 70):
                    $('#modalDialog > .modal-dialog').addClass('modal-60');
                    break;
                case (x >= 70 && x < 80):
                    $('#modalDialog > .modal-dialog').addClass('modal-70');
                    break;
                case (x >= 80 && x < 90):
                    $('#modalDialog > .modal-dialog').addClass('modal-80');
                    break;
                case (x >= 90):
                    $('#modalDialog > .modal-dialog').addClass('modal-90');
                    break;
                default:
                    $('#modalDialog > .modal-dialog').addClass('modal-full');
                    break;
            }
        }
    }
    $('#modalDialogLv2 > .modal-dialog > .modal-content > .modal-header > .modal-title').text(caption);
    $('#modalDialogLv2').modal('show');
}
function clearModalLv2() {
    $('#modalDialogLv2 > .modal-dialog > .modal-content > .modal-body').html('');
    $('#modalDialogLv2 > .modal-dialog > .modal-content > .modal-header > .modal-title').text('');
    $('#modalDialogLv2').modal('hide');
}
//-------------------------------------------------------------------------------------------------------
function clearValueByDiv(div) {
    $('#' + div + ' input').val("");
    $('#' + div + ' select').val("");
    $('#' + div + ' textarea').val("");
}
function swalProgressBar(icon, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: message
    })
}
function swalMessageError(icon, message) {
    Swal.fire({
        title: message,
        icon: icon
    });
}
function swalMessage(icon, message) {
    Swal.fire({
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1000
    });
}
function confirmMessage() {
    Swal.fire({
        title: "System error - Do you want error message?",
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../Error/Index";
        }
    });
}
function confirmDelete(id, url, name) {
    Swal.fire({
        title: 'คุณต้องการลบ ' + name + " ?",
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ใช่',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'ไม่ใช่',
    }).then((result) => {
        if (result.isConfirmed) Delete(id, url);
        //sendDelete(id, url);
    });
}
function confirmDeleteWithImage(id, url, imageUrl) {
    Swal.fire({
        title: 'คุณต้องการลบ ?',
        imageUrl: imageUrl,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ใช่',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'ไม่ใช่',
    }).then((result) => {
        if (result.isConfirmed) {
            sendDelete(id, url);
        }
    });
}
function sendDelete(id, url) {
    var url = url;
    var data = { "id": id };
    $.post(url, data, function (result) {
        if (result.isSuccess) {
            swalMessage('success', result.message);
            closeModal();
            getList();
        }
        else {
            swalMessage('error', result.message);
            window.location.href = result.returnUrl;
        }
    });
}
function setReadOnlyByDiv(div, x) {
    if (x) {
        $('#' + div).find('input[name],select[name],textarea[name],input[type=file]').not('input[type=hidden]').removeAttr('disabled').removeAttr('readonly')
            .attr('disabled', 'disabled').attr('readonly', 'readonly');
    }
    else {
        $('#' + div).find('input[name],select[name],textarea[name],input[type=file]').not('input[type=hidden]').removeAttr('disabled').removeAttr('readonly');
    }
}
function setReadOnly(div, x) {
    if (!x) {
        $('#' + div).removeAttr('disabled').removeAttr('readonly')
            .attr('disabled', 'disabled').attr('readonly', 'readonly');
    }
    else {
        $('#' + div).removeAttr('disabled').removeAttr('readonly');
    }
}
function setReqByDiv(div, x) {
    if (x) {
        $('#' + div + ' input,select').removeAttr('required').attr('required', 'required');
    }
    else {
        $('#' + div + ' input,select').removeAttr('required');
    }
}
function setReq(div, x) {
    if (x) {
        $('#' + div).removeAttr('required').attr('required', 'required');
    }
    else {

        $('#' + div).removeAttr('required');
        $('#' + div).closest('div.form-group').removeClass('has-error has-danger');
    }
}
function setNavActive() {
    /*** add active class and stay opened when selected ***/
    var url = window.location;

    // for sidebar menu entirely but not cover treeview
    //$('ul.nav-sidebar a').filter(function () {
    //    if (this.href) {
    //        return this.href == url || url.href.indexOf(this.href) == 0;
    //    }

    //}).addClass('active');

    // for the treeview
    $('ul.nav-treeview a').filter(function () {
        if (this.href) {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }

    }).parentsUntil(".nav-sidebar > .nav-treeview").addClass('menu-open').prev('a').addClass('active');
}
function NavActive() {
    var url = window.location;
    // for single sidebar menu
    $('ul.nav-sidebar a').filter(function () {
        return this.href == url;
    }).addClass('active');

    // for sidebar menu and treeview
    $('ul.nav-treeview a').filter(function () {
        return this.href == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview")
        .css({ 'display': 'block' })
        .addClass('menu-open').prev('a')
        .addClass('active');
}

