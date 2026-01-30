import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Importando Icones do pacote padrão do Expo
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  // 1. ESTADO: Lista dos nomes dos jogadores (Começa vazia)
  const [jogadores, setJogadores] = useState<string[]>([]);

  // 2. ESTADO: O texto que está sendo digitado agora no input
  const [novoNome, setNovoNome] = useState("");

  // 3. ESTADO: Controla se mostramos o botão "+" ou o Input de texto
  const [estouAdicionando, setEstouAdicionando] = useState(false);

  // FUNÇÃO: Adicionar jogador na lista
  const confirmarJogador = () => {
    if (novoNome.trim() === "") {
      Alert.alert("Ops", "O nome não pode ser vazio!");
      return;
    }

    // Adiciona o novo nome à lista antiga
    setJogadores([...jogadores, novoNome]);

    // Limpa o input e volta a mostrar o botão de "+"
    setNovoNome("");
    setEstouAdicionando(false);
  };

  // FUNÇÃO: Iniciar o jogo (Validação)
  const iniciarJogo = () => {
    if (jogadores.length < 3) {
      Alert.alert("Faltam jogadores", "Mínimo de 3 pessoas para jogar!");
      return;
    }
    Alert.alert("Sucesso", "O jogo vai começar agora! (Lógica futura)");
  };

  // FUNÇÃO EXTRA: Remover jogador (Caso erre o nome)
  const removerJogador = (indexParaRemover: number) => {
    const novaLista = jogadores.filter(
      (_, index) => index !== indexParaRemover,
    );
    setJogadores(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Quem vai jogar?</Text>
      <Text style={styles.subtitulo}>{jogadores.length} / 20 Jogadores</Text>

      {/* LISTA DE JOGADORES ADICIONADOS */}
      <ScrollView style={styles.listaContainer}>
        {/* Aqui fazemos um LOOP (Map) para desenhar cada jogador */}
        {jogadores.map((jogador, index) => (
          <View key={index} style={styles.itemJogador}>
            <Text style={styles.textoJogador}>
              {index + 1}. {jogador}
            </Text>

            {/* Botãozinho de lixeira para remover */}
            <TouchableOpacity onPress={() => removerJogador(index)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ÁREA DE ADICIONAR (Lógica Condicional) */}
        {jogadores.length < 20 && (
          <View style={styles.areaAdicionar}>
            {estouAdicionando ? (
              // SE VERDADEIRO: Mostra Input + Botão OK
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do jogador"
                  value={novoNome}
                  onChangeText={setNovoNome}
                  autoFocus={true} // Teclado abre sozinho
                />
                <TouchableOpacity
                  style={styles.btnConfirmar}
                  onPress={confirmarJogador}
                >
                  <Ionicons name="checkmark" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              // SE FALSO: Mostra só o ícone de +
              <TouchableOpacity
                style={styles.btnAdicionar}
                onPress={() => setEstouAdicionando(true)}
              >
                <Ionicons name="add-circle" size={50} color="#007AFF" />
                <Text style={styles.textoAdicionar}>Adicionar Jogador</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* BOTÃO FINAL DE INICIAR */}
      {jogadores.length >= 3 && (
        <TouchableOpacity style={styles.btnIniciar} onPress={iniciarJogo}>
          <Text style={styles.textoBtnIniciar}>COMEÇAR JOGO</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ESTILOS (O CSS da coisa)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Para não colar no topo da tela
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  listaContainer: {
    flex: 1,
  },
  itemJogador: {
    flexDirection: "row", // Deixa texto e lixeira lado a lado
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // Sombra no Android
  },
  textoJogador: {
    fontSize: 18,
    color: "#333",
  },
  areaAdicionar: {
    marginTop: 10,
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  input: {
    flex: 1, // Ocupa todo espaço possível
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    fontSize: 16,
  },
  btnConfirmar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  btnAdicionar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10, // Espaço entre icone e texto
  },
  textoAdicionar: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },
  btnIniciar: {
    backgroundColor: "#333",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  textoBtnIniciar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
