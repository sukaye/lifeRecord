$(function() {
    var flag = false;
    loadData();

    $('#addButton').click(function() {

        newInit();
        $('#itemModal').modal({
            closable: true,
            onHide: function() {
                if (flag) {
                    save();
                }
            }
        }).modal('show');



    });

    $('#editTitleInput').on('change', function() {
        flag = true;
    });
    $('#editTextarea').on('change', function() {
        flag = true;
    });

    $("#itemsDiv").on('click', '.ui.card > .content', function() {
        flag = false;
        var item = $(this);
        $('#editTitleInput').val(item.children('.header').text());
        $('#editTextarea').val(item.children('.description').text());
        var showTime = 'updated&nbsp;: ' + item.children('.meta').text() + '&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' + 'created&nbsp;&nbsp;: ' + item.children('.createdTime').val().substr(0, 16).replace('T', ' ') + '&nbsp;&nbsp;&nbsp;&nbsp;';
        $('#showTimeLable').html('');
        $('#showTimeLable').append(showTime);
        $('#showTimeLable').show();
        $('#itemModal').modal({
            closable: true,
            onHide: function() {
                $('#editTitleInput').blur();
                $('#editTextarea').blur();
                if (flag) {
                    update(item);
                }
            }
        }).modal('show');

    });

    $('#itemsDiv').on('click', '.ui.right.corner.label', function() {
        if (confirm("Delete it?")) {
            var item = $(this);
            var id = item.next().children('.itemId').val();
            $.delete('liferecord/' + id, {}, function() {
                item.parent().remove();
            });
        }
    });

});

function loadData() {
    $.get('liferecords',
        function(data) {
            showData(data);
        },
        'json');
}

function showData(data) {
    var itemDiv = null;
    $.each(data,
        function(i, item) {
            itemDiv = $('#firstItemDiv').clone();
            itemDiv.removeAttr('id');
            itemDiv.children('.content').children('.itemId').val(item.id);
            itemDiv.children('.content').children('.createdTime').val(item.created_at);
            itemDiv.children('.content').children('.updatedTime').val(item.updated_at);
            itemDiv.children('.content').children('.header').text(item.title);
            itemDiv.children('.content').children('.meta').text(item.updated_at.substr(0, 16).replace('T', ' '));
            itemDiv.children('.content').children('.description').text(item.content);
            itemDiv.removeClass('firstItemDiv');
            $('#itemsDiv').append(itemDiv);
        });
}

function newInit() {
    flag = false;
    $('#showTimeLable').hide();
    $('#editTitleInput').val('');
    $('#editTextarea').val('');

    // use Tab key in textarea
    $("#editTextarea").on('keydown',
        function(e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                var indent = '         ';
                var start = this.selectionStart;
                var end = this.selectionEnd;
                var selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, '\n' + indent);
                this.value = this.value.substring(0, start) + selected + this.value.substring(end);
                this.setSelectionRange(start + indent.length, start + selected.length);
            }
        });
}

function save() {
    var title = $('#editTitleInput').val();
    var content = $('#editTextarea').val();
    $.post('liferecord', {
        'title': title,
        'content': content
    }, function(data) {
        var itemDiv = $('#firstItemDiv').clone();
        itemDiv.removeAttr('id');
        itemDiv.removeClass('firstItemDiv');
        itemDiv.children('.content').children('.itemId').val(data.id);
        itemDiv.children('.content').children('.header').text(data.title);
        itemDiv.children('.content').children('.createdTime').val(data.created_at.substr(0, 16).replace('T', ' '));
        itemDiv.children('.content').children('.updatedTime').val(data.updated_at.substr(0, 16).replace('T', ' '));
        itemDiv.children('.content').children('.meta').text(data.updated_at.substr(0, 16).replace('T', ' '));
        itemDiv.children('.content').children('.description').text(data.content);
        $('#itemsDiv').prepend(itemDiv);
    }, 'json');
}


function update(item) {
    var id = item.children('.itemId').val();
    var title = $('#editTitleInput').val();
    var content = $('#editTextarea').val();
    item.children('.header').text(title);
    item.children('.description').text(content);
    $.put('liferecord/' + id, {
        'title': title,
        'content': content
    }, function(data) {
        item.children('.meta').text(data.updated_at.substr(0, 16).replace('T', ' '));
        var showTime = 'updated&nbsp;: ' + data.updated_at.substr(0, 16).replace('T', ' ') + '&nbsp;&nbsp;&nbsp;&nbsp;<br><br>' + 'created&nbsp;&nbsp;: ' + data.created_at.substr(0, 16).replace('T', ' ') + '&nbsp;&nbsp;&nbsp;&nbsp;';
        $('#showTimeLable').html('');
        $('#showTimeLable').append(showTime);
        $('#itemsDiv').prepend(item.parent().clone());
        item.parent().remove();
    }, 'json');
}
