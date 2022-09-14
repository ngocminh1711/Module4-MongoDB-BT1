
const deleteCustomer = async (id) => {
    await $.ajax({
        url: `http://localhost:8000/customer/delete/${id}`,
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status)
            console.log(thrownError)
        }
    });
    location.reload();

}