import SwiftUI

struct ContentView: View {
    
    private let storageKey = "todo_items"
    
    @State private var todoItems: [TodoItem] = []
    
    @State private var newTaskText = ""
    @State private var isAddPanelOpen = false
    
    @State private var editingID: UUID?
    @State private var editingText: String = ""
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 16) {
                Text("Мой To-Do")
                    .font(.largeTitle.bold())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                
                List {
                    ForEach(todoItems) { item in
                        TodoRowView(
                            item: item,
                            isEditing: editingID == item.id,
                            editingText: bindingForEditingText(for: item),
                            onToggle: {
                                toggleTask(item)
                            },
                            onStartEdit: {
                                startEditing(item)
                            },
                            onSaveEdit: {
                                saveEdit(for: item)
                            },
                            onCancelEdit: {
                                cancelEditing()
                            }
                        )
                        .listRowSeparator(.hidden)
                        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                        .listRowBackground(Color.clear)
                        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                            Button(role: .destructive) {
                                deleteTask(item)
                            } label: {
                                Label("Удалить", systemImage: "trash")
                            }
                        }
                    }
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                
                AddTaskBottomPanel(
                    isOpen: $isAddPanelOpen,
                    newTaskText: $newTaskText,
                    onSave: saveNewTask
                )
            }
            .padding(.top)
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear{
            loadTasks()
        }
    }
    
    private func bindingForEditingText(for item: TodoItem) -> Binding<String> {
        Binding(
            get: {
                editingID == item.id ? editingText : item.title
            },
            set: { newValue in
                if editingID == item.id {
                    editingText = newValue
                }
            }
        )
    }
    
    private func toggleTask(_ item: TodoItem) {
        guard let index = todoItems.firstIndex(where: { $0.id == item.id }) else { return }
        todoItems[index].isDone.toggle()
        withAnimation {
            sortTasks()
        }
    }
    
    private func startEditing(_ item: TodoItem) {
        editingID = item.id
        editingText = item.title
    }
    
    private func saveEdit(for item: TodoItem) {
        let trimmed = editingText.trimmingCharacters(in: .whitespacesAndNewlines)
        
        guard let index = todoItems.firstIndex(where: { $0.id == item.id }) else { return }
        
        if trimmed.isEmpty {
            editingID = nil
            editingText = ""
            return
        }
        
        todoItems[index].title = trimmed
        editingID = nil
        editingText = ""
        saveTasks()
    }
    
    private func cancelEditing() {
        editingID = nil
        editingText = ""
    }
    
    private func deleteTask(_ item: TodoItem) {
        todoItems.removeAll { $0.id == item.id }
        
        if editingID == item.id {
            cancelEditing()
        }
        saveTasks()
    }
    
    private func saveNewTask() {
        let trimmed = newTaskText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        
        let newItem = TodoItem(title: trimmed)
        todoItems.insert(newItem, at: 0)
        
        newTaskText = ""
        
        withAnimation {
            isAddPanelOpen = false
        }
        saveTasks()
    }
    
    private func sortTasks() {
        todoItems.sort { one, two in
            if one.isDone == two.isDone {
                return false
            }
            return one.isDone == false && two.isDone == true
        }
        saveTasks()
    }
    
    private func saveTasks() {
        do {
            let data = try JSONEncoder().encode(todoItems)
            UserDefaults.standard.set(data, forKey: storageKey)
        } catch {
            print("Ошибка сохранения задач:", error)
        }
    }

    private func loadTasks() {
        guard let data = UserDefaults.standard.data(forKey: storageKey) else { return }

        do {
            todoItems = try JSONDecoder().decode([TodoItem].self, from: data)
        } catch {
            print("Ошибка загрузки задач:", error)
        }
    }
}

#Preview {
    ContentView()
}
