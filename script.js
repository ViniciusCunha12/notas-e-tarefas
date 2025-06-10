$(function () {
  function salvarTarefas() {
    const tarefas = []
    $('#listaTarefas li').each(function () {
      tarefas.push({
        texto: $(this).clone().children().remove().end().text().trim(),
        concluida: $(this).hasClass('concluida')
      })
    })
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }

  function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || []
    tarefasSalvas.forEach(t => {
      let li = $('<li>').text(t.texto)
      if (t.concluida) li.addClass('concluida')
      let btn = $('<button>').text('X')
      btn.on('click', function () {
        $(this).parent().remove()
        salvarTarefas()
      })
      li.on('click', function () {
        $(this).toggleClass('concluida')
        salvarTarefas()
      })
      li.append(btn)
      $('#listaTarefas').append(li)
    })
  }

  function salvarNotas() {
    const notas = []
    $('#notasSalvas p').each(function () {
      notas.push($(this).clone().children().remove().end().text().trim())
    })
    localStorage.setItem('notas', JSON.stringify(notas))
  }

  function carregarNotas() {
    const notasSalvas = JSON.parse(localStorage.getItem('notas')) || []
    notasSalvas.forEach(nota => {
      let p = $('<p>').text(nota)
      let span = $('<span>').text('×')
      span.on('click', function () {
        $(this).parent().remove()
        salvarNotas()
      })
      p.append(span)
      $('#notasSalvas').append(p)
    })
  }

  $('#addTarefa').on('click', function () {
    let texto = $('#tarefaInput').val().trim()
    if (texto !== '') {
      let li = $('<li>').text(texto)
      let btn = $('<button>').text('X')
      btn.on('click', function () {
        $(this).parent().remove()
        salvarTarefas()
      })
      li.on('click', function () {
        $(this).toggleClass('concluida')
        salvarTarefas()
      })
      li.append(btn)
      $('#listaTarefas').append(li)
      $('#tarefaInput').val('')
      salvarTarefas()
    }
  })

  $('#addNota').on('click', function () {
    let nota = $('#notaInput').val().trim()
    if (nota !== '') {
      let p = $('<p>').text(nota)
      let span = $('<span>').text('×')
      span.on('click', function () {
        $(this).parent().remove()
        salvarNotas()
      })
      p.append(span)
      $('#notasSalvas').append(p)
      $('#notaInput').val('')
      salvarNotas()
    }
  })

  carregarTarefas()
  carregarNotas()
})
