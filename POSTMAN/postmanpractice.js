function itemtostring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addedParamCount = 0;

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', function () {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('clcik', function () {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})


let addParam = document.getElementById('addParam');
addParam.addEventListener('click', function () {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;
    let paramElement = itemtostring(string);
    params.appendChild(paramElement);


    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', function (e) {
            e.target.paramElement.remove();
        })
    }
    addedParamCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', function () {
    document.getElementById('responseJsonText').value = "Fetching Data right now, kindly wait";

    let url = document.getElementById('url').value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;


    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }


    console.log(url);
    console.log(contentType);
    console.log(requestType);
    console.log(data);



    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
            document.getElementById('requestJsonText').value = text;
        })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: { 'content-type': 'application/json; charset=UTF-8' }
        })
            .then(function (response) {
                response.text();
            }).then(function (text) {
                document.getElementById('requestJsonText').value = text;
            })
    }
})