import torch
from torch.autograd import Variable

import torchvision
from torchvision.utils import save_image

from random import randint
import numpy as np

import piano_roll_utils
import utils
import model as cvae

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

image_channels = 1
model = cvae.VAE(image_channels=image_channels).to(device)
model_version = "graybin_bce-imgs_2297-epch_60-100" #"grayv-nimgs_1339-epochs_50"#"velo-alb-nimgs_1339-epochs_50" #"alb-nimgs_4312-epochs_50" #"AC-nimgs_2515-epochs_50" vae.torch-alb-nimgs_4312-epochs_50
model.load_state_dict(torch.load('models/cvae.' + model_version, map_location='cpu'))


initial_z = torch.Tensor([[-0.2945, -0.5343, -0.3924,  0.1169, -0.1280,  0.0468, -0.1618,  0.3406, \
          0.1086, -0.4598,  0.3852, -0.9597,  0.3223, -0.2671,  0.6670,  0.1103,    \
         -0.4733, -0.0280, -0.1303,  0.2576,  0.5677,  0.5857, -0.0060, -0.2402,    \
          0.0129, -0.6804, -0.0873,  0.5896, -0.3272,  0.5114, -0.0224, -0.0447]])

decoded_val = model.decode(initial_z)
tmp = piano_roll_utils.piano_roll_from_prob(decoded_val)

tmp_filename = 'imgs/current.png'
save_image(tmp, tmp_filename)