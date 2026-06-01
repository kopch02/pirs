
import SwiftUI

struct AddTaskBottomPanel: View {
    @Binding var isOpen: Bool
    @Binding var newTaskText: String
    let onSave: () -> Void
    
    var body: some View {
        VStack(spacing: 12) {
            if isOpen {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Новая задача")
                        .font(.headline)

                    TextEditor(text: $newTaskText)
                        .frame(minHeight: 100, maxHeight: 140)
                        .padding(8)
                        .background(Color(.systemGray6))
                        .clipShape(RoundedRectangle(cornerRadius: 10))

                    Button(action: onSave) {
                        HStack {
                            Spacer()
                            Text("Сохранить")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(.white)
                            Spacer()
                        }
                        .padding(.vertical, 12)
                        .background(Color.blue)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                    }
                    .disabled(newTaskText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                }
                .padding(16)
                .background(Color(.systemGray5))
                .clipShape(RoundedRectangle(cornerRadius: 20))
                .shadow(color: .black.opacity(0.12), radius: 12, x: 0, y: 4)
                .padding(.horizontal, 16)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }

            HStack {
                Spacer()

                Button(action: togglePanel) {
                    Image(systemName: isOpen ? "xmark" : "plus")
                        .font(.system(size: 22, weight: .bold))
                        .foregroundStyle(.white)
                        .frame(width: 60, height: 60)
                        .background(isOpen ? Color.red : Color.blue)
                        .clipShape(Circle())
                        .shadow(color: .black.opacity(0.15), radius: 10, x: 0, y: 4)
                }
                .buttonStyle(.plain)
                .padding(.trailing, 16)
            }
        }
        .padding(.top, 8)
        .padding(.bottom, 8)
        .background(.clear)
        .animation(.easeInOut(duration: 0.2), value: isOpen)
    }
    
    private func togglePanel() {
        withAnimation {
            isOpen.toggle()
        }
        
        if !isOpen {
            newTaskText = ""
        }
    }
}
