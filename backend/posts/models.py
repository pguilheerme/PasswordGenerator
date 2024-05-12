from django.db import models
import numpy as np
import string as sp

class Post(models.Model):
    email = models.CharField(max_length=50)
    site = models.CharField(max_length=50)
    password = models.CharField(blank=True ,max_length=20)
    length = models.IntegerField(default=8, max_length=20)

    def _str_(self):
        return f"Post: {self.email}"
    
    def save(self, *args, **kwargs):
        if not self.password:
            letters = sp.ascii_letters
            numbers = sp.digits
            punctuation = sp.punctuation
            listOfAll = letters+numbers+punctuation
            password = np.random.choice(list(listOfAll), self.length)
            self.password = ''.join(password)
        elif self.password:
            letters = sp.ascii_letters
            numbers = sp.digits
            punctuation = sp.punctuation
            listOfAll = letters+numbers+punctuation
            password = np.random.choice(list(listOfAll), self.length)
            self.password = ''.join(password)
            
        super().save(*args, **kwargs)