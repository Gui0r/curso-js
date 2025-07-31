// Sistema de Recados - JavaScript
// Autor: Sistema desenvolvido para gerenciar recados

class SistemaRecados {
    constructor() {
        this.recados = [];
        this.proximoId = 1;
        this.init();
    }

    // Inicialização do sistema
    init() {
        this.carregarRecados();
        this.configurarEventos();
        this.renderizarLista();
        this.atualizarContadores();
        
        // Efeito de entrada com jQuery
        $('body').hide().fadeIn(1000);
        
        console.log('Sistema de Recados inicializado com sucesso!');
    }

    // Configurar todos os eventos
    configurarEventos() {
        // Evento de submit do formulário
        $('#formRecado').on('submit', (e) => {
            e.preventDefault();
            this.cadastrarRecado();
        });

        // Validação em tempo real
        $('#quemDeixou, #paraQuem').on('input', (e) => {
            this.validarCampoTexto(e.target);
        });

        $('#textoRecado').on('input', (e) => {
            this.validarTextoRecado(e.target);
            this.atualizarContadorCaracteres();
        });

        // Botão limpar todos
        $('#btnLimparTodos').on('click', () => {
            this.confirmarLimpezaTotal();
        });

        // Confirmação do modal
        $('#btnConfirmar').on('click', () => {
            this.executarAcaoConfirmada();
        });

        // Efeitos visuais nos cards
        $(document).on('mouseenter', '.recado-item', function() {
            $(this).addClass('shadow-sm');
        });

        $(document).on('mouseleave', '.recado-item', function() {
            $(this).removeClass('shadow-sm');
        });
    }

    // Validar campo de texto (nome)
    validarCampoTexto(campo) {
        const valor = campo.value.trim();
        const isValido = valor.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(valor);
        
        if (valor === '') {
            this.removerValidacao(campo);
        } else if (isValido) {
            this.marcarComoValido(campo);
        } else {
            this.marcarComoInvalido(campo, 'Nome deve ter pelo menos 2 caracteres e conter apenas letras');
        }
        
        return isValido || valor === '';
    }

    // Validar texto do recado
    validarTextoRecado(campo) {
        const valor = campo.value.trim();
        const isValido = valor.length >= 5 && valor.length <= 500;
        
        if (valor === '') {
            this.removerValidacao(campo);
        } else if (isValido) {
            this.marcarComoValido(campo);
        } else if (valor.length < 5) {
            this.marcarComoInvalido(campo, 'O recado deve ter pelo menos 5 caracteres');
        } else {
            this.marcarComoInvalido(campo, 'O recado não pode ter mais de 500 caracteres');
        }
        
        return isValido || valor === '';
    }

    // Marcar campo como válido
    marcarComoValido(campo) {
        $(campo).removeClass('is-invalid').addClass('is-valid');
        $(campo).siblings('.invalid-feedback').hide();
    }

    // Marcar campo como inválido
    marcarComoInvalido(campo, mensagem) {
        $(campo).removeClass('is-valid').addClass('is-invalid');
        $(campo).siblings('.invalid-feedback').text(mensagem).show();
    }

    // Remover validação
    removerValidacao(campo) {
        $(campo).removeClass('is-valid is-invalid');
        $(campo).siblings('.invalid-feedback').hide();
    }

    // Atualizar contador de caracteres
    atualizarContadorCaracteres() {
        const texto = $('#textoRecado').val();
        const contador = $('#contadorCaracteres');
        const tamanho = texto.length;
        
        contador.text(tamanho);
        
        // Mudar cor baseado no tamanho
        contador.removeClass('contador-warning contador-danger');
        if (tamanho > 400) {
            contador.addClass('contador-danger');
        } else if (tamanho > 300) {
            contador.addClass('contador-warning');
        }
    }

    // Validar formulário completo
    validarFormulario() {
        const quemDeixou = $('#quemDeixou').val().trim();
        const paraQuem = $('#paraQuem').val().trim();
        const textoRecado = $('#textoRecado').val().trim();
        
        let isValido = true;
        
        // Validar quem deixou
        if (!quemDeixou) {
            this.marcarComoInvalido($('#quemDeixou')[0], 'Este campo é obrigatório');
            isValido = false;
        } else if (!this.validarCampoTexto($('#quemDeixou')[0])) {
            isValido = false;
        }
        
        // Validar para quem
        if (!paraQuem) {
            this.marcarComoInvalido($('#paraQuem')[0], 'Este campo é obrigatório');
            isValido = false;
        } else if (!this.validarCampoTexto($('#paraQuem')[0])) {
            isValido = false;
        }
        
        // Validar texto do recado
        if (!textoRecado) {
            this.marcarComoInvalido($('#textoRecado')[0], 'Este campo é obrigatório');
            isValido = false;
        } else if (!this.validarTextoRecado($('#textoRecado')[0])) {
            isValido = false;
        }
        
        return isValido;
    }

    // Cadastrar novo recado
    cadastrarRecado() {
        if (!this.validarFormulario()) {
            this.mostrarToast('Por favor, corrija os erros no formulário', 'error');
            
            // Efeito de shake no formulário
            $('#formRecado').addClass('shake');
            setTimeout(() => {
                $('#formRecado').removeClass('shake');
            }, 500);
            
            return;
        }

        // Coletar dados do formulário
        const novoRecado = {
            id: this.proximoId++,
            quemDeixou: $('#quemDeixou').val().trim(),
            paraQuem: $('#paraQuem').val().trim(),
            textoRecado: $('#textoRecado').val().trim(),
            dataHora: new Date().toISOString()
        };

        // Adicionar à lista
        this.recados.push(novoRecado);
        
        // Salvar no localStorage
        this.salvarRecados();
        
        // Limpar formulário
        this.limparFormulario();
        
        // Renderizar lista
        this.renderizarLista();
        
        // Atualizar contadores
        this.atualizarContadores();
        
        // Mostrar notificação
        this.mostrarToast('Recado cadastrado com sucesso!', 'success');
        
        // Efeito visual no botão
        const btnSubmit = $('#formRecado button[type="submit"]');
        btnSubmit.addClass('loading');
        setTimeout(() => {
            btnSubmit.removeClass('loading');
        }, 1000);
        
        console.log('Novo recado cadastrado:', novoRecado);
    }

    // Limpar formulário
    limparFormulario() {
        $('#formRecado')[0].reset();
        $('#formRecado .form-control').removeClass('is-valid is-invalid');
        $('#formRecado .invalid-feedback').hide();
        this.atualizarContadorCaracteres();
        
        // Efeito de limpeza
        $('#formRecado .form-control').fadeOut(200).fadeIn(200);
    }

    // Renderizar lista de recados
    renderizarLista() {
        const container = $('#listaRecados');
        const mensagemVazia = $('#mensagemVazia');
        
        if (this.recados.length === 0) {
            mensagemVazia.fadeIn();
            $('#btnLimparTodos').hide();
            return;
        }
        
        mensagemVazia.hide();
        $('#btnLimparTodos').show();
        
        // Limpar container
        container.empty();
        
        // Renderizar cada recado
        this.recados.forEach((recado, index) => {
            const itemHtml = this.criarItemRecado(recado, index);
            const $item = $(itemHtml);
            
            // Adicionar com animação
            $item.hide().appendTo(container).fadeIn(500);
        });
    }

    // Criar HTML do item de recado
    criarItemRecado(recado, index) {
        const dataFormatada = this.formatarDataHora(recado.dataHora);
        
        return `
            <div class="list-group-item recado-item" data-index="${index}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="recado-header">
                            <div class="row">
                                <div class="col-md-6">
                                    <small class="text-muted">
                                        <i class="bi bi-person-fill text-primary"></i>
                                        <strong>De:</strong> ${this.escapeHtml(recado.quemDeixou)}
                                    </small>
                                </div>
                                <div class="col-md-6 text-md-end">
                                    <small class="text-muted">
                                        <i class="bi bi-person-check-fill text-info"></i>
                                        <strong>Para:</strong> ${this.escapeHtml(recado.paraQuem)}
                                    </small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recado-texto">
                            <i class="bi bi-chat-quote-fill text-warning me-2"></i>
                            ${this.escapeHtml(recado.textoRecado)}
                        </div>
                        
                        <div class="recado-footer">
                            <i class="bi bi-calendar-event text-muted me-1"></i>
                            ${dataFormatada}
                        </div>
                    </div>
                    
                    <button class="btn btn-outline-danger btn-sm btn-remover ms-3" 
                            onclick="sistemaRecados.confirmarRemocao(${index})"
                            title="Remover recado">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Formatar data e hora
    formatarDataHora(isoString) {
        const data = new Date(isoString);
        const agora = new Date();
        const diferenca = agora - data;
        
        // Se foi hoje
        if (diferenca < 24 * 60 * 60 * 1000 && data.getDate() === agora.getDate()) {
            const horas = data.getHours().toString().padStart(2, '0');
            const minutos = data.getMinutes().toString().padStart(2, '0');
            return `Hoje às ${horas}:${minutos}`;
        }
        
        // Se foi ontem
        const ontem = new Date(agora);
        ontem.setDate(ontem.getDate() - 1);
        if (data.getDate() === ontem.getDate() && data.getMonth() === ontem.getMonth()) {
            const horas = data.getHours().toString().padStart(2, '0');
            const minutos = data.getMinutes().toString().padStart(2, '0');
            return `Ontem às ${horas}:${minutos}`;
        }
        
        // Data completa
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Escape HTML para segurança
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Confirmar remoção de recado
    confirmarRemocao(index) {
        const recado = this.recados[index];
        $('#mensagemConfirmacao').html(`
            Tem certeza que deseja remover o recado de <strong>${this.escapeHtml(recado.quemDeixou)}</strong> 
            para <strong>${this.escapeHtml(recado.paraQuem)}</strong>?
        `);
        
        this.acaoConfirmada = () => this.removerRecado(index);
        
        const modal = new bootstrap.Modal('#modalConfirmacao');
        modal.show();
    }

    // Confirmar limpeza total
    confirmarLimpezaTotal() {
        $('#mensagemConfirmacao').html(`
            Tem certeza que deseja remover <strong>todos os ${this.recados.length} recados</strong>? 
            Esta ação não pode ser desfeita.
        `);
        
        this.acaoConfirmada = () => this.limparTodosRecados();
        
        const modal = new bootstrap.Modal('#modalConfirmacao');
        modal.show();
    }

    // Executar ação confirmada
    executarAcaoConfirmada() {
        if (this.acaoConfirmada) {
            this.acaoConfirmada();
            this.acaoConfirmada = null;
        }
        
        const modal = bootstrap.Modal.getInstance('#modalConfirmacao');
        modal.hide();
    }

    // Remover recado específico
    removerRecado(index) {
        const recadoRemovido = this.recados[index];
        
        // Efeito de saída
        $(`.recado-item[data-index="${index}"]`).fadeOut(300, () => {
            // Remover do array
            this.recados.splice(index, 1);
            
            // Salvar no localStorage
            this.salvarRecados();
            
            // Renderizar lista
            this.renderizarLista();
            
            // Atualizar contadores
            this.atualizarContadores();
            
            // Mostrar notificação
            this.mostrarToast('Recado removido com sucesso!', 'success');
        });
        
        console.log('Recado removido:', recadoRemovido);
    }

    // Limpar todos os recados
    limparTodosRecados() {
        // Efeito de saída em todos os itens
        $('.recado-item').fadeOut(300, () => {
            this.recados = [];
            this.proximoId = 1;
            
            // Salvar no localStorage
            this.salvarRecados();
            
            // Renderizar lista
            this.renderizarLista();
            
            // Atualizar contadores
            this.atualizarContadores();
            
            // Mostrar notificação
            this.mostrarToast('Todos os recados foram removidos!', 'success');
        });
        
        console.log('Todos os recados foram removidos');
    }

    // Atualizar contadores
    atualizarContadores() {
        const total = this.recados.length;
        $('#totalRecados').text(total);
        
        // Efeito no badge
        if (total > 0) {
            $('#totalRecados').addClass('pulse');
            setTimeout(() => {
                $('#totalRecados').removeClass('pulse');
            }, 500);
        }
    }

    // Salvar recados no localStorage
    salvarRecados() {
        try {
            const dados = {
                recados: this.recados,
                proximoId: this.proximoId,
                ultimaAtualizacao: new Date().toISOString()
            };
            
            localStorage.setItem('sistemaRecados', JSON.stringify(dados));
            console.log('Dados salvos no localStorage');
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            this.mostrarToast('Erro ao salvar dados localmente', 'error');
        }
    }

    // Carregar recados do localStorage
    carregarRecados() {
        try {
            const dados = localStorage.getItem('sistemaRecados');
            
            if (dados) {
                const dadosParsed = JSON.parse(dados);
                this.recados = dadosParsed.recados || [];
                this.proximoId = dadosParsed.proximoId || 1;
                
                console.log(`${this.recados.length} recados carregados do localStorage`);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.mostrarToast('Erro ao carregar dados salvos', 'error');
            this.recados = [];
            this.proximoId = 1;
        }
    }

    // Mostrar toast de notificação
    mostrarToast(mensagem, tipo = 'success') {
        const toast = $('#toastNotificacao');
        const toastBody = $('#mensagemToast');
        const toastHeader = toast.find('.toast-header');
        
        // Configurar conteúdo
        toastBody.text(mensagem);
        
        // Configurar estilo baseado no tipo
        toast.removeClass('toast-success toast-error');
        toastHeader.find('i').removeClass('bi-check-circle-fill bi-exclamation-triangle-fill text-success text-danger');
        
        if (tipo === 'success') {
            toast.addClass('toast-success');
            toastHeader.find('i').addClass('bi-check-circle-fill text-success');
        } else {
            toast.addClass('toast-error');
            toastHeader.find('i').addClass('bi-exclamation-triangle-fill text-danger');
        }
        
        // Mostrar toast
        const bsToast = new bootstrap.Toast(toast[0]);
        bsToast.show();
    }

    // Método para exportar dados (funcionalidade extra)
    exportarDados() {
        const dados = {
            recados: this.recados,
            exportadoEm: new Date().toISOString(),
            totalRecados: this.recados.length
        };
        
        const dataStr = JSON.stringify(dados, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `recados_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.mostrarToast('Backup dos recados exportado!', 'success');
    }

    // Método para importar dados (funcionalidade extra)
    importarDados(arquivo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const dados = JSON.parse(e.target.result);
                
                if (dados.recados && Array.isArray(dados.recados)) {
                    this.recados = dados.recados;
                    this.proximoId = Math.max(...this.recados.map(r => r.id), 0) + 1;
                    
                    this.salvarRecados();
                    this.renderizarLista();
                    this.atualizarContadores();
                    
                    this.mostrarToast(`${dados.recados.length} recados importados!`, 'success');
                } else {
                    throw new Error('Formato de arquivo inválido');
                }
            } catch (error) {
                console.error('Erro ao importar:', error);
                this.mostrarToast('Erro ao importar arquivo', 'error');
            }
        };
        
        reader.readAsText(arquivo);
    }

    // Estatísticas dos recados
    obterEstatisticas() {
        const stats = {
            total: this.recados.length,
            hoje: 0,
            estaSemana: 0,
            autorMaisAtivo: null,
            destinatarioMaisComum: null
        };
        
        if (this.recados.length === 0) return stats;
        
        const agora = new Date();
        const inicioSemana = new Date(agora.setDate(agora.getDate() - agora.getDay()));
        const inicioHoje = new Date();
        inicioHoje.setHours(0, 0, 0, 0);
        
        const autores = {};
        const destinatarios = {};
        
        this.recados.forEach(recado => {
            const dataRecado = new Date(recado.dataHora);
            
            // Contar hoje
            if (dataRecado >= inicioHoje) {
                stats.hoje++;
            }
            
            // Contar esta semana
            if (dataRecado >= inicioSemana) {
                stats.estaSemana++;
            }
            
            // Contar autores
            autores[recado.quemDeixou] = (autores[recado.quemDeixou] || 0) + 1;
            
            // Contar destinatários
            destinatarios[recado.paraQuem] = (destinatarios[recado.paraQuem] || 0) + 1;
        });
        
        // Encontrar autor mais ativo
        if (Object.keys(autores).length > 0) {
            stats.autorMaisAtivo = Object.keys(autores).reduce((a, b) => 
                autores[a] > autores[b] ? a : b
            );
        }
        
        // Encontrar destinatário mais comum
        if (Object.keys(destinatarios).length > 0) {
            stats.destinatarioMaisComum = Object.keys(destinatarios).reduce((a, b) => 
                destinatarios[a] > destinatarios[b] ? a : b
            );
        }
        
        return stats;
    }
}

// Adicionar estilo CSS para animação shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Inicializar sistema quando o DOM estiver pronto
$(document).ready(function() {
    // Criar instância global do sistema
    window.sistemaRecados = new SistemaRecados();
    
    // Adicionar funcionalidades extras via console
    console.log('Sistema de Recados carregado!');
    console.log('Comandos disponíveis:');
    console.log('- sistemaRecados.exportarDados() - Exportar backup');
    console.log('- sistemaRecados.obterEstatisticas() - Ver estatísticas');
});

// Prevenir perda de dados ao sair da página
window.addEventListener('beforeunload', function(e) {
    if (window.sistemaRecados && window.sistemaRecados.recados.length > 0) {
        const mensagem = 'Você tem recados cadastrados. Tem certeza que deseja sair?';
        e.returnValue = mensagem;
        return mensagem;
    }
});

