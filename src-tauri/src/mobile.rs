
 #[tauri::command]
 pub fn greet(name: &str) -> String {
  println!("前端{}",name);
    format!("Hello, {}!", name)
 }
#[tauri::mobile_entry_point]
fn main() {
  println!("mobile start....");
  super::AppBuilder::new().run()
}
