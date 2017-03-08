/* eslint-env browser, jquery */

(($) => {
  let current = -1;
  let data = $('#info');
  let filenames = data.data('filenames');
  let labels = data.data('labels');
  const buttons = $('#buttons');

  let html = '';
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    html += `<button id="button-${l}" data-label="${l}">${l}</button>`;
  }

  buttons.html(html);

  buttons.click((e) => {
    const l = $(e.target).data('label');
    logButtonClick(l, filenames[current]);
    setNextAudioSrc();
  });

  setNextAudioSrc();

  function setNextAudioSrc() {
    current++;
    $('#logger').html(
      `File <strong>#${current + 1} of ${filenames.length}</strong> \
       (${filenames[current]})`);
    const audio = document.getElementById('audioEl');
    const source = document.getElementById('audioSource');
    source.src = `/static/data/${filenames[current]}`;
    audio.load();
  }

  function logButtonClick(label, filename) {
    $.ajax({
      url: '/newlabel',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({label, filename}),
      dataType: 'json',
      success: () => {
        $('#list').append(`<li>${filename}, ${label}</li>`);
      },
    });
  }
})($);
