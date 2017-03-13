/* eslint-env browser, jquery */

(($) => {
  const labels = [
    'accordion',
    'bassoon',
    'clarinet',
    'guitar',
    'perc',
    'piano',
    'saxophone',
    'violin',
    'vocals',
    'whistle',
    'click track',
    'multiple sources',
    'inaudible',
    'broken',
  ];

  const data = $('#info');
  const filenames = data.data('filenames');
  let current = data.data('current');

  const buttons = $('#buttons');
  const sendAndGetNext = $('#sendAndGetNext');

  let html = '';
  for (let i = 0; i < labels.length; i++) {
    const l = labels[i];
    html += `
      <input type="checkbox" id="button-${l}" data-label="${l}" class="feature">
        <label for="button-${l}">${l}</label>
      </input><br/>`;
  }

  buttons.html(html);
  const features = $('.feature');

  function getCheckedFeatures() {
    const l = [];
    features.filter(':checked').each((i, el) => {
      l.push($(el).data('label'));
    });
    return l.toString();
  }

  function clearCheckboxes() {
    return features.prop('checked', false);
  }

  function setNextAudioSrc() {
    $('#logger').html(
      `File <strong>#${current + 1} of ${filenames.length}</strong> \
       (${filenames[current]})`);
    const audio = document.getElementById('audioEl');
    const source = document.getElementById('audioSource');
    source.src = `/static/data/${filenames[current]}`;
    setTimeout(() => {
      audio.load();
    }, 0);
  }

  function logCurrentClip() {
    const label = getCheckedFeatures();
    const filename = filenames[current];
    $.ajax({
      url: '/newlabel',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({label, filename}),
      dataType: 'json',
      success: (r) => {
        current = r.current;
        setNextAudioSrc();
        $('#list').append(`<li>${filename},${label}</li>`);
      },
    });
    return clearCheckboxes();
  }

  $(window).on('keydown', (e) => {
    e.originalEvent.key === 'Enter' && logCurrentClip();
  });

  sendAndGetNext.click(() => {
    logCurrentClip();
  });

  setNextAudioSrc();
})($);
