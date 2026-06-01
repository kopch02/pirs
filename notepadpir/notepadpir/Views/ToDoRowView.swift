import SwiftUI

struct TodoRowView: View {
    let item: TodoItem
    let isEditing: Bool
    @Binding var editingText: String
    
    let onToggle: () -> Void
    let onStartEdit: () -> Void
    let onSaveEdit: () -> Void
    let onCancelEdit: () -> Void
    
    @FocusState private var isTextFieldFocused: Bool
    
    var body: some View {
        HStack(spacing: 12) {
            Button(action: onToggle) {
                Image(systemName: item.isDone ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 16))
                    .foregroundColor(item.isDone ? .green : .gray)
            }
            .buttonStyle(.plain)
            
            VStack(alignment: .leading, spacing: 6) {
                if isEditing {
                    TextField("Введите текст задачи", text: $editingText)
                        .font(.system(size: 17, weight: .medium))
                        .textFieldStyle(.plain)
                        .submitLabel(.done)
                        .focused($isTextFieldFocused)
                        .onSubmit {
                            onSaveEdit()
                        }
                        .onAppear {
                            DispatchQueue.main.async {
                                isTextFieldFocused = true
                            }
                        }
                } else {
                    Text(item.title)
                        .font(.system(size: 17, weight: .medium))
                        .strikethrough(item.isDone)
                        .foregroundStyle(item.isDone ? .gray : .primary)
                }
                
                Text(item.isDone ? "Выполнено" : "Активно")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            
            Spacer()
            
            if isEditing {
                HStack(spacing: 10) {
                    Button(action: onSaveEdit) {
                        Image(systemName: "checkmark")
                            .foregroundStyle(.green)
                    }
                    .buttonStyle(.plain)
                    
                    Button(action: onCancelEdit) {
                        Image(systemName: "xmark")
                            .foregroundStyle(.red)
                    }
                    .buttonStyle(.plain)
                }
            } else {
                Button(action: onStartEdit) {
                    Image(systemName: "pencil")
                        .foregroundStyle(.blue)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(14)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 18))
        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 3)
    }
}
