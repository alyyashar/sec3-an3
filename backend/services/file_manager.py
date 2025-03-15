import os
import tempfile

class FileManager:
    def __init__(self):
        self.base_dir = tempfile.mkdtemp()  # Create a temp directory for storing contract files

    def save_contract(self, contract_code: str, contract_name: str = "contract") -> str:
        """
        Saves Solidity contract to a temp file and returns the file path.
        """
        contract_path = os.path.join(self.base_dir, f"{contract_name}.sol")
        with open(contract_path, "w") as f:
            f.write(contract_code)
        return contract_path

    def read_contract(self, contract_path: str) -> str:
        """
        Reads Solidity contract file and returns its content.
        """
        if not os.path.exists(contract_path):
            raise FileNotFoundError("Contract file not found")
        
        with open(contract_path, "r") as f:
            return f.read()

    def apply_fix(self, contract_path: str, line_number: int, fixed_code: str) -> str:
        """
        Applies an AI-generated fix to a specific line in the contract.
        Returns the updated contract code.
        """
        lines = self.read_contract(contract_path).split("\n")
        if 0 < line_number <= len(lines):
            lines[line_number - 1] = fixed_code
        else:
            raise ValueError("Invalid line number")

        fixed_contract_path = contract_path.replace(".sol", "_fixed.sol")
        with open(fixed_contract_path, "w") as f:
            f.write("\n".join(lines))
        
        return fixed_contract_path  # Return path to fixed contract
