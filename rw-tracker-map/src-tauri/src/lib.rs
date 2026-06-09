#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

#[inline]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(
            #[expect(clippy::exit, reason = "exit on failure")]
            {
                tauri::generate_context!()
            },
        )
        .unwrap_or_else(|e| {
            unreachable!("error while running tauri application: {e}")
        });
}
