// ViewModel: estructura de datos SIMPLE, sin comportamiento.
// Solo transporta datos YA FORMATEADOS listos para mostrar.
// La View solo tiene que leerlo y volcarlo a pantalla.
export interface GameViewModel {
    playerWeaponText: string;    // "piedra", "papel", "tijeras"
    machineWeaponText: string;   // "piedra", "papel", "tijeras"
    resultEmoji: string;         // "🎉", "😢", "🤝"
    resultMessage: string;       // "¡Ganaste!", "Perdiste.", "¡Empate!"
    fullOutput: string;          // El mensaje completo listo para mostrar
}

export interface ErrorViewModel {
    errorMessage: string;        // "❌ Error: Opción inválida..."
}
