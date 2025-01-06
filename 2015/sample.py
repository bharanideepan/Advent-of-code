def transform_file_extension(file_path):
    """
    Takes a file path and returns a tuple with the original path 
    and the path with an uppercase file extension, ensuring the extension
    is derived from the last period in the path.
    
    :param file_path: str - The input file path
    :return: tuple - (original_path, uppercase_extension_path)
    """
    if '.' in file_path:
        base, extension = file_path.rsplit('.', 1)  # Split at the last period
        return f"{base}.{extension.lower()}", f"{base}.{extension.upper()}"
    else:
        # If there's no extension, return the file path as is
        return file_path, file_path

# Example usage
input_path = "//rf/doc/file_name.file_name.pdf"
original, transformed = transform_file_extension(input_path)
print(original)
print(transformed)
