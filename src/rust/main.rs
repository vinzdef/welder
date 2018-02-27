// Exported function
#[no_mangle]
pub fn compute(operator: i32, n1: f32, n2: f32) -> f32 {
    match operator {
        0 => n1 + n2,
        1 => n1 - n2,
        2 => n1 * n2,
        3 => n1 / n2,
        _ => n1
    }
}

// Only run when compiled to bin
fn main() {
    let result: f32 = compute(1, 1.0, 1.0);
    println!("{}", result);
}
