from Crypto.Cipher import AES
import hashlib

def dekrypter_med_md5(filnavn, passord):
    """
    Dekrypterer en fil kryptert med OpenSSL AES-256-CBC og MD5-basert nøkkelavledning
    """
    # Les den krypterte filen
    with open(filnavn, "rb") as f:
        data = f.read()
    
    # OpenSSL format: "Salted__" + 8 bytes salt + encrypted data
    if data[:8] != b"Salted__":
        raise ValueError("Filen er ikke kryptert med OpenSSL format")
    
    # Hent salt
    salt = data[8:16]
    ciphertext = data[16:]
    
    # Generer nøkkel og IV med MD5 (OpenSSL metode)
    # key = MD5(password + salt)
    # iv = MD5(key + password + salt)
    
    password_bytes = passord.encode() if isinstance(passord, str) else passord
    
    # Første runde: key
    key = hashlib.md5(password_bytes + salt).digest()
    
    # Andre runde: IV
    iv = hashlib.md5(key + password_bytes + salt).digest()
    
    # Dekrypter
    cipher = AES.new(key, AES.MODE_CBC, iv)
    plaintext = cipher.decrypt(ciphertext)
    
    # Fjern padding (PKCS7)
    padding_length = plaintext[-1]
    plaintext = plaintext[:-padding_length]
    
    return plaintext


def brute_force_dekryptering(filnavn, output_fil="dekryptert_melding.txt"):
    """
    Prøver alle 4-sifrede PIN-koder (0000-9999)
    """
    print(f"Starter brute force dekryptering av {filnavn}...")
    
    for i in range(10000):
        pin = f"{i:04d}"
        
        try:
            plaintext = dekrypter_med_md5(filnavn, pin)
            
            # Sjekk om det ser ut som lesbar tekst
            if b"Bra" in plaintext or b"FLAG" in plaintext or b"flag" in plaintext:
                print(f"\n✓ Fant PIN-kode: {pin}")
                print(f"Dekryptert melding:\n{plaintext.decode('utf-8', errors='ignore')}")
                
                # Lagre til fil
                with open(output_fil, "w", encoding="utf-8") as f:
                    f.write(plaintext.decode('utf-8', errors='ignore'))
                
                return pin, plaintext
                
        except Exception as e:
            # Prøv neste PIN
            continue
        
        # Vis fremdrift
        if i % 1000 == 0:
            print(f"Testet {i}/10000 PIN-koder...")
    
    print("Fant ikke riktig PIN-kode")
    return None, None


def dekrypter_med_kjent_passord(filnavn, passord, output_fil="dekryptert_melding.txt"):
    """
    Dekrypterer med kjent passord
    """
    try:
        plaintext = dekrypter_med_md5(filnavn, passord)
        print(f"Dekryptert melding:\n{plaintext.decode('utf-8', errors='ignore')}")
        
        # Lagre til fil
        with open(output_fil, "w", encoding="utf-8") as f:
            f.write(plaintext.decode('utf-8', errors='ignore'))
        
        return plaintext
    except Exception as e:
        print(f"Feil ved dekryptering: {e}")
        return None


if __name__ == "__main__":
    # Velg hvilken metode du vil bruke:
    
    # Metode 1: Brute force (hvis du ikke vet passordet)
    brute_force_dekryptering("TK2100_F02_kryptert.dta")
    
    # Metode 2: Dekrypter med kjent passord (erstatt "1234" med passordet)
    # dekrypter_med_kjent_passord("TK2100_F02_kryptert.dta", "1234")
