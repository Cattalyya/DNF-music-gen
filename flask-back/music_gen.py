import torch
from torch.autograd import Variable

import torchvision
from torchvision.utils import save_image

from random import randint
import numpy as np

import cvae.piano_roll_utils
import cvae.utils
import cvae.model

DEFAULT_Z_32 = torch.Tensor([[-0.2945, -0.5343, -0.3924,  0.1169, -0.1280,  0.0468, -0.1618,  0.3406, \
          0.1086, -0.4598,  0.3852, -0.9597,  0.3223, -0.2671,  0.6670,  0.1103,    \
         -0.4733, -0.0280, -0.1303,  0.2576,  0.5677,  0.5857, -0.0060, -0.2402,    \
          0.0129, -0.6804, -0.0873,  0.5896, -0.3272,  0.5114, -0.0224, -0.0447]])
DEFAULT_Z_16 = torch.Tensor([[ 4.3544,  4.2615, -1.2923,  2.8112, -1.0387,  2.7553, -1.2929,  1.1836,
          1.6973,  0.8104, -5.8594,  5.2743,  1.1677,  1.0070, -0.3817,  1.8645]])
Z_DIM = 32

class MusicGen:
    def __init__(self):
        # Device configuration
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.image_channels = 1
        self.model = cvae.model.VAE(image_channels=self.image_channels, z_dim=Z_DIM).to(self.device)
        self.model_version = "graybin_bce-imgs_2297-epch_60-100" if Z_DIM == 32 else "graybin_bce_d16-imgs_2297-epch_100" #"graybin_bce-imgs_2297-epch_60-100" 
        self.model.load_state_dict(torch.load('cvae/models/cvae.' + self.model_version, map_location='cpu'))
        self.DEFAULT_Z = DEFAULT_Z_32
        self.z = self.DEFAULT_Z
        self.img_filename = 'cvae/imgs/current.png'
        self.refresh_z()

    def get_z(self):
        return np.array(self.z[0])

    # z[i] = val
    def update_z_i(self, i, val):
        self.z[0][i] = val
        self.refresh_z()

    def refresh_z(self):
        decoded_val = self.model.decode(self.z)
        pianoroll = cvae.piano_roll_utils.piano_roll_from_prob(decoded_val)
        save_image(pianoroll, self.img_filename)


