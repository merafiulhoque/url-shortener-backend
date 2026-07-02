export async function signOut(req, res) {
    return res
        .status(200)
        .clearCookie("token")
        .json({
        success: true,
        message: "Logout Successfull..."
    });
}
