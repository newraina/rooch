script {
    use std::debug;
    use std::string;

    fun main() {
        debug::print(&string::utf8(b"Hello, world!"));
    }
}