let $pagination = $('.pagination'),
    $table = $('#commands'),
    maxRows = 10,
    totalRows = $table.find('tbody tr').length;

$table
    .find('tbody > tr')
    .hide()
    .slice(0, maxRows)
    .show();

if (totalRows > maxRows) {
    let pageNum = Math.ceil(totalRows / maxRows);

    for (let i = 1; i <= pageNum; i++) {
        let $pageItem = $('<li>').addClass('page-item').data('page', i).append(
            $('<a>').addClass('page-link').attr('href', '#').text(i)
        );

        $pagination.append($pageItem);
    }
}

$pagination.find('li:first-child').addClass('active');
$pagination.find('li').on('click', function(e) {
    let pageNum = $(this).data('page'),
        trIndex = 0;

    $pagination.find('li').removeClass('active');
    $(this).addClass('active');
    $table.find('tr:gt(0)').each(function() {
        trIndex++;

        if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
});
