var mymap;

buildMap((details.coordinates.lat + 0.008), details.coordinates.lng)
getLocation(18)
fetchPoi()

function buildMap(lat, lng) {
    mymap = L.map('map').setView([lat, lng], 15);// initialize map view

    L.tileLayer(details.url, {
        attribution: details.attribution,
        apikey: ''
    }).addTo(mymap);

    mymap.on('dblclick', function (e) {
        const popLocation = e.latlng;
        L.popup().setLatLng(popLocation)
            .setContent(dataEntry(e.latlng))
            .openOn(mymap);
        mymap.flyTo([e.latlng.lat + 0.0008, e.latlng.lng], 18);
    });
}

function dataEntry(latlng) {
    let form = document.createElement('form')
    form.action = '/'
    form.method = 'POST'
    let h3 = document.createElement('h3')
    let coord = document.createElement('h2')

    let lat = document.createElement('input')
    lat.name = 'lat'
    lat.style.display = 'none'
    let lon = document.createElement('input')
    lon.name = 'lon'
    lon.style.display = 'none'
    let name = document.createElement('input')
    name.name = 'name'
    name.placeholder = 'POI'
    name.required = true
    let short_name = document.createElement('input')
    short_name.name = 'short_name'
    short_name.placeholder = 'Short Name'
    short_name.required = true

    let div1 = document.createElement('div')
    div1.setAttribute('class', 'selct')
    let lbl1 = document.createElement('p')
    lbl1.textContent = 'Type '
    let poitype = document.createElement('select')
    let type = document.createElement('input')
    type.name = 'type'
    type.style.display = 'none'

    let div2 = document.createElement('div')
    div2.setAttribute('class', 'selct')
    let lbl2 = document.createElement('p')
    lbl2.textContent = 'Subtype '
    let poisubtype = document.createElement('select')
    let subtype = document.createElement('input')
    subtype.name = 'subtype'
    subtype.style.display = 'none'
    let code = document.createElement('input')
    code.name = 'code'
    code.style.display = 'none'
    let button = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Submit'

    types.forEach(element => {
        let option = document.createElement('option')
        option.value = element.type
        option.textContent = element.type
        poitype.appendChild(option)
    });

    loadSubtype(poitype, poisubtype, subtype, code,"")

    poitype.onchange = () => {
        type.value = poitype.value
        loadSubtype(poitype, poisubtype, subtype, code,"")
    }

    lat.value = latlng.lat
    lon.value = latlng.lng
    type.value = poitype.value
    subtype.value = poisubtype.value
    h3.textContent = 'Add POI Data'
    coord.textContent = 'Lat: ' + lat.value.substring(0, 10) + ', Lng: ' + lon.value.substring(0, 11)

    form.appendChild(h3)
    form.appendChild(coord)
    form.appendChild(lat)
    form.appendChild(lon)
    form.appendChild(name)
    form.appendChild(short_name)
    form.appendChild(div1)
    div1.appendChild(lbl1)
    div1.appendChild(poitype)
    form.appendChild(div2)
    div2.appendChild(lbl2)
    div2.appendChild(poisubtype)
    form.appendChild(type)
    form.appendChild(subtype)
    form.appendChild(code)
    form.appendChild(button)
    return form
}

function dataUpdate(data) {
    let form = document.createElement('form')
    form.action = '/'+data._id
    form.method = 'POST'
    let h3 = document.createElement('h3')
    let coord = document.createElement('h2')

    let lat = document.createElement('input')
    lat.name = 'lat'
    lat.style.display = 'none'
    let lon = document.createElement('input')
    lon.name = 'lon'
    lon.style.display = 'none'
    let name = document.createElement('input')
    name.name = 'name'
    name.value = data.name
    name.required = true
    let short_name = document.createElement('input')
    short_name.name = 'short_name'
    short_name.value = data.short_name
    short_name.required = true

    let div1 = document.createElement('div')
    div1.setAttribute('class', 'selct')
    let lbl1 = document.createElement('p')
    lbl1.textContent = 'Type '
    let poitype = document.createElement('select')
    let type = document.createElement('input')
    type.name = 'type'
    type.style.display = 'none'

    let div2 = document.createElement('div')
    div2.setAttribute('class', 'selct')
    let lbl2 = document.createElement('p')
    lbl2.textContent = 'Subtype '
    let poisubtype = document.createElement('select')
    let subtype = document.createElement('input')
    subtype.name = 'subtype'
    subtype.style.display = 'none'
    let code = document.createElement('input')
    code.name = 'code'
    code.style.display = 'none'
    let button = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Submit'

    types.forEach(element => {
        let option = document.createElement('option')
        option.value = element.type
        option.textContent = element.type
        poitype.appendChild(option)
    });

    poitype.value = data.type
    subtype.value = data.subtype

    loadSubtype(poitype, poisubtype, subtype, code,subtype.value)

    poitype.onchange = () => {
        type.value = poitype.value
        loadSubtype(poitype, poisubtype, subtype, code, subtype.value)
    }

    lat.value = data.lat
    lon.value = data.lon
    type.value = poitype.value
    subtype.value = poisubtype.value
    h3.textContent = 'Update POI Data'
    coord.textContent = 'Lat: ' + data.lat.substring(0, 10) + ', Lng: ' + data.lon.substring(0, 11)

    form.appendChild(h3)
    form.appendChild(coord)
    form.appendChild(lat)
    form.appendChild(lon)
    form.appendChild(name)
    form.appendChild(short_name)
    form.appendChild(div1)
    div1.appendChild(lbl1)
    div1.appendChild(poitype)
    form.appendChild(div2)
    div2.appendChild(lbl2)
    div2.appendChild(poisubtype)
    form.appendChild(type)
    form.appendChild(subtype)
    form.appendChild(code)
    form.appendChild(button)

    let del = document.createElement('h6')
    del.textContent = "Delete POI"
    del.onclick = ()=>{
        let url = '/' + data._id
        fetch(url, { method: "DELETE" }).then(response => response.json()).then(result => {
            alert(result.message)
            window.location.href = '/'
        })
    }

    form.appendChild(del)

    return form
}

function fetchPoi() {

    let pp = document.getElementById('popup')
    if (pp.textContent == 'Show Popups') {
        pp.textContent = 'Hide Popups'
        pp.classList.remove('inactive')
        pp.classList.add('active')
    }
    else if (popup.textContent == 'Hide Popups') {
        pp.textContent = 'Show Popups'
        pp.classList.remove('active')
        pp.classList.add('inactive')
    }

    fetch('/poi', { method: "GET" }).then(response => response.json()).then(result => {
        if (result.length > 0) {
            document.getElementById('total').textContent = result.length + ' POIs'
            if (mymap && mymap.remove) {
                mymap.off();
                mymap.remove();
            }

            buildMap(parseFloat(result[result.length - 1].lat), parseFloat(result[result.length - 1].lon))

            result.forEach(element => {
                displayPoi(element)
            });
            mymap.flyTo([parseFloat(result[result.length - 1].lat), parseFloat(result[result.length - 1].lon)], 15);
            document.getElementById('area').textContent = 'Zoomed in to the latest POI'
        }
    })
}

function displayPoi(data) {
    
  let marker =  L.marker([parseFloat(data.lat), parseFloat(data.lon)], { title: data.name }).addTo(mymap).on('click', () => {
        popup = new L.Popup();
        popup.setLatLng([parseFloat(data.lat), parseFloat(data.lon)]);
        popup.setContent(dataUpdate(data));
        mymap.addLayer(popup)
    })
    if (data.code == null) {
        marker._icon.classList.add("huechange");
    }
   
    let pp = document.getElementById('popup')
    if (pp.textContent != 'Show Popups') {
        str = (data.name.length > 20) ? data.name.substring(0, 20) + '...' : data.name
        var popupContent1 = '<p>' + str + ' </p>',
            popup1 = new L.Popup();
        popup1.setLatLng([parseFloat(data.lat), parseFloat(data.lon)]);
        popup1.setContent(popupContent1);
        mymap.addLayer(popup1)
    }
}

function loadSubtype(poitype, poisubtype, subtype, code,selected) {
   
    poisubtype.textContent = ''
    let result = types.filter(obj => {
        return obj.type === poitype.value
    })

    result[0].subtype.forEach(element => {
        let option = document.createElement('option')
        option.value = element.subtype
        option.textContent = element.subtype
        code.value = element.code
        poisubtype.appendChild(option)
    });

    if(selected != ""){
        poisubtype.value = selected
        result[0].subtype.forEach(element => {
            if(element.subtype==selected)
                code.value = element.code
        });
    }

    subtype.value = poisubtype.value
    code.value = code.value
    poisubtype.onchange = () => {
        subtype.value = poisubtype.value
        code.value = code.value
    }
}

function getLocation(zoom) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        L.popup().setLatLng(details.coordinates)
            .setContent('We could not get your location. Default location is used!')
            .openOn(mymap);
        mymap.flyTo([details.coordinates.lat, details.coordinates.lon], zoom);
    }
}

function showPosition(position) {
    details.coordinates.lat = position.coords.latitude
    details.coordinates.lng = position.coords.longitude

    mymap.flyTo([position.coords.latitude, position.coords.longitude], 17);
    document.getElementById('area').textContent = 'We are using the device location to center the map'
}

function previewPoi(data) {
    let form = document.createElement('form')
    form.action = '/'
    form.method = 'POST'
    let h3 = document.createElement('h3')
    let coord = document.createElement('p')
    let name = document.createElement('p')
    let short_name = document.createElement('p')
    let type = document.createElement('p')
    let subtype = document.createElement('p')

    h3.textContent = 'Preview POI Data'
    name.textContent = 'Name: ' + data.name
    short_name.textContent = 'Short Name: '+ data.short_name
    type.textContent = 'Type: '+data.type
    subtype.textContent = 'Subtype: ' + data.subtype
    coord.textContent = 'Lat: ' + data.lat.substring(0, 10) + ', Lng: ' + data.lon.substring(0, 11)

    form.appendChild(h3)
    form.appendChild(coord)
    form.appendChild(name)
    form.appendChild(short_name)
    form.appendChild(type)
    form.appendChild(subtype)
    return form
}