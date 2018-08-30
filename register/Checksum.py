import base64
import string
import random
import hashlib

from Crypto.Cipher import AES


IV = "@@@@&&&&####$$$$"
BLOCK_SIZE = 16


def generate_checksum(param_dict, merchant_key, salt=None):
    params_string = __get_param_string__(param_dict)
    salt = salt if salt else __id_generator__(4)
    final_string = '%s|%s' % (params_string, salt)

    hasher = hashlib.sha256(final_string.encode())
    hash_string = hasher.hexdigest()

    hash_string += salt

    return __encode__(hash_string, IV, merchant_key)


def generate_checksum_by_str(param_str, merchant_key, salt=None):
    params_string = param_str
    salt = salt if salt else __id_generator__(4)
    final_string = '%s|%s' % (params_string, salt)

    hasher = hashlib.sha256(final_string.encode())
    hash_string = hasher.hexdigest()

    hash_string += salt

    return __encode__(hash_string, IV, merchant_key)


def verify_checksum(param_dict, merchant_key, checksum):
    # Remove checksum
    if 'CHECKSUMHASH' in param_dict:
        param_dict.pop('CHECKSUMHASH')

    # Get salt
    paytm_hash = __decode__(checksum, IV, merchant_key)
    salt = paytm_hash[-4:]
    calculated_checksum = generate_checksum(param_dict, merchant_key, salt=salt)
    return calculated_checksum == checksum

def verify_checksum_by_str(param_str, merchant_key, checksum):
    # Remove checksum
    #if 'CHECKSUMHASH' in param_dict:
        #param_dict.pop('CHECKSUMHASH')

    # Get salt
    paytm_hash = __decode__(checksum, IV, merchant_key)
    salt = paytm_hash[-4:]
    calculated_checksum = generate_checksum_by_str(param_str, merchant_key, salt=salt)
    return calculated_checksum == checksum



def __id_generator__(size=6, chars=string.ascii_uppercase + string.digits + string.ascii_lowercase):
    return ''.join(random.choice(chars) for _ in range(size))


def __get_param_string__(params):
    params_string = []
    for key in sorted(params.keys()):
        value = params[key]
        params_string.append('' if value == 'null' else str(value))
    return '|'.join(params_string)


__pad__ = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
__unpad__ = lambda s: s[0:-ord(s[-1])]


def __encode__(to_encode, iv, key):
    # Pad
    to_encode = __pad__(to_encode)
    # Encrypt
    c = AES.new(key, AES.MODE_CBC, iv)
    to_encode = c.encrypt(to_encode)
    # Encode
    to_encode = base64.b64encode(to_encode)
    return to_encode


def __decode__(to_decode, iv, key):
    # Decode
    to_decode = base64.b64decode(to_decode)
    # Decrypt
    c = AES.new(key, AES.MODE_CBC, iv)
    to_decode = c.decrypt(to_decode)
    # remove pad
    return __unpad__(to_decode)
