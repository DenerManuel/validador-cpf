/* ── Formata o input enquanto o usuário digita ──────────── */
function formatarCPF(valor) {
  // Mantém apenas dígitos e limita a 11
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  // Aplica a máscara 000.000.000-00 progressivamente
  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return numeros.slice(0, 3) + '.' + numeros.slice(3);
  if (numeros.length <= 9)
    return numeros.slice(0, 3) + '.' + numeros.slice(3, 6) + '.' + numeros.slice(6);
  return (
    numeros.slice(0, 3) +
    '.' +
    numeros.slice(3, 6) +
    '.' +
    numeros.slice(6, 9) +
    '-' +
    numeros.slice(9)
  );
}

/* ── Valida o CPF (lógica idêntica ao código de exemplo) ── */
function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) return null; // incompleto → sem veredicto

  if (/^(\d)\1{10}$/.test(numeros)) return false; // todos iguais → inválido

  function calcularDigito(base, pesoInicial) {
    const soma = base.split('').reduce((acc, d, i) => acc + Number(d) * (pesoInicial - i), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }

  const digito1 = calcularDigito(numeros.slice(0, 9), 10);
  if (digito1 !== Number(numeros[9])) return false;

  const digito2 = calcularDigito(numeros.slice(0, 10), 11);
  if (digito2 !== Number(numeros[10])) return false;

  return true;
}

/* ── Atualiza o painel de resultado ─────────────────────── */
function atualizarResultado(cpfFormatado) {
  const painel = document.getElementById('resultado');
  const resultado = validarCPF(cpfFormatado);
  const numeros = cpfFormatado.replace(/\D/g, '');

  if (numeros.length === 0) {
    // Campo vazio: esconde o painel
    painel.className = '';
    painel.textContent = '';
    return;
  }

  if (resultado === null) {
    // Dígitos insuficientes: feedback neutro
    painel.className = 'neutro';
    painel.textContent = `${numeros.length} de 11 dígitos — continue digitando…`;
  } else if (resultado === true) {
    painel.className = 'valido';
    painel.textContent = `✓  ${cpfFormatado} é um CPF válido.`;
  } else {
    painel.className = 'invalido';
    painel.textContent = `✗  ${cpfFormatado} é um CPF inválido.`;
  }
}

/* ── Evento: dispara a cada tecla pressionada ────────────── */
const input = document.getElementById('cpf-input');

input.addEventListener('input', function () {
  const cpfFormatado = formatarCPF(this.value);
  this.value = cpfFormatado;
  atualizarResultado(cpfFormatado);
});
